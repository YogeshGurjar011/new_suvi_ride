const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const geolib = require('geolib');
const customerRidesModel = require('../../models/ridesModel/ridesModel.js');
const customerModel = require('../../models/customerModel/customerModel/customerBasicDetailsModel');
const driverModel = require('../../models/driverModel/driverModel/driverModel');

// Create New Ride
const createNewRide = async (req, res) => {
  try {
    // Get latitude and longitude of pickup and destination locations using Geocoding API
    const customerId = req.body.customerId
    const pickupLocation = req.body.pickupLocation
    const pickupLatitude = req.body.pickupLatitude
    const pickupLongitude = req.body.pickupLongitude
    const destinationLocation = req.body.destinationLocation
    const destinationLatitude = req.body.destinationLatitude
    const destinationLongitude = req.body.destinationLongitude
    const numberOfPassengers = req.body.numberOfPassengers
    const scheduled = req.body.scheduled
    const scheduledDate = req.body.scheduledDate
    const scheduledTime = req.body.scheduledTime
    const bookedFor = req.body.bookedFor
    const vehicleType = req.body.vehicleType
    // calculating distance between pickup and destination location using geolib library of javascript
    const pickupLocationLatLong = { latitude: pickupLatitude, longitude: pickupLongitude };
    const destinationLocationLatLOng = { latitude: destinationLatitude, longitude: destinationLongitude };

    const distanceInMeters = geolib.getDistance(pickupLocationLatLong, destinationLocationLatLOng);
    const distanceInMiles = distanceInMeters * 0.000621371;
    // calculating fare 
    const baseFare = 2.50;
    const costPerMile = 1.50;
    const costPerKilometer = 0.93;

    let fare;

    if (distanceInMiles) {
      fare = baseFare + (distanceInMiles * costPerMile);
    } else {
      fare = baseFare + (distanceInMeters / 1000 * costPerKilometer);
    }

    // Round fare to 2 decimal places
    fare = Math.round(fare * 100) / 100;

    const newCustomerRide = new customerRidesModel({
      customerId,
      pickupLocation,
      pickupLatitude,
      pickupLongitude,
      destinationLocation,
      destinationLatitude,
      destinationLongitude,
      distance: distanceInMiles,
      numberOfPassengers,
      scheduled,
      scheduledDate,
      scheduledTime,
      bookedFor,
      fare,
      vehicleType
    })

    const rideResult = await newCustomerRide.save();
    if (rideResult) {
      const customer = await customerModel.findById(customerId);
      if (customer) {
        customer.rides.push(newCustomerRide);
        const customerRideResult = await customer.save();
        if (customerRideResult) {
          res.status(200).send({
            success: true,
            successCode: 200,
            data: newCustomerRide,
            message: 'New Ride Created Successfully'
          })
        }
        else {
          res.status(400).send({
            success: false,
            successCode: 400,
            message: 'Not Able To Create This Ride'
          })
        }
      }
      else {
        res.status(404).send({
          success: false,
          successCode: 404,
          message: 'Cutomer Not Found With This CustomerId'
        })
      }
    }
    else {
      res.status(400).send({
        success: false,
        successCode: 400,
        message: 'Something Went Wrong Not Able To Create This Ride'
      })
    }

  } catch (error) {
    res.status(500).send({
      success: false,
      successCode: 500,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

// Get Available Rides 


const getAvailableRides = async (req, res) => {
  try {
   // const pickupLocation = req.body.pickupLocation
    const pickupLatitude = req.body.pickupLatitude
    const pickupLongitude = req.body.pickupLongitude

    const rides = await customerRidesModel.find({
      pickupLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [pickupLongitude, pickupLatitude],
          },
          $maxDistance: 5000, // maximum distance in meters
        },
      },
      rideType,
      paymentMethod,
      status: 'Pending',
    });

    res.status(200).json({
      success: true,
      data: rides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};




module.exports = {
  createNewRide
}