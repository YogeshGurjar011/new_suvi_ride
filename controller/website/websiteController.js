const nodemailer = require('nodemailer'); 
const haversine = require('haversine');
const rideModel = require('../../models/ridesModel/ridesModel');
const VehicleTypeModel= require('../../models/adminModel/adminScreenModel/adminVehicalTypeModel');
const contactUsModel = require('../../models/websiteContactUsModel');
const toRadians = (degrees) => {
  return degrees * Math.PI / 180;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in km
  return distance;
};

const getDuration = (distance) => {
  const averageSpeed = 30; // Average speed in km/h
  const duration = distance / averageSpeed; // Duration in hours
  return duration;
};

const calculateFare = async (pickup, dropoff) => {
  const distanceInKm = haversine(pickup, dropoff, { unit: 'km' });
  const fareRatePerKm = 2.5; // Assuming a fare rate of $2.5 per km
  const fare = distanceInKm * fareRatePerKm;

  return fare;
};

const getFare = async (req, res) => {
  try {
    const { pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude } = req.body;
    const distance = getDistance(pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude);
    const duration = getDuration(distance);
    const fare = await calculateFare({ latitude: pickupLatitude, longitude: pickupLongitude }, { latitude: destinationLatitude, longitude: destinationLongitude });

    res.status(200).send({
      success: true,
      message: 'Fare calculated successfully',
      distance: distance * 1000, // Distance in meters
      duration: duration * 3600, // Duration in seconds
      fare: fare,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


// show all vehicals to the user

const showFareToUsers = async (req, res) => {
  try {
    const { pickupLocation, pickupLatitude, pickupLongitude, destinationLocation, destinationLatitude, destinationLongitude } = req.body;
    const vehicleDetails = {};

    // Fetch the fare rates and base fare for all vehicles
    const vehicles = await VehicleTypeModel.find({});
    for (const vehicle of vehicles) {
      vehicleDetails[vehicle.name] = {
        baseFare: vehicle.baseFare,
        perKmCharge: vehicle.perKmCharge
      };
    }

    // Calculate the distance and duration between the pickup location and the dropoff location
    const distance = getDistanceFromLatLonInKm(pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude);
    const time = Math.round((distance / 30) * 60);  // Assuming an average speed of 30 km/h

    // Calculate the fare for each vehicle type
    const fareOfVehicles = [];
    for (const vehicle of vehicles) {
      const fare = Math.round(vehicle.baseFare + (distance * vehicle.perKmCharge));
      const allVehicles = {
        vehicleName: vehicle.name,
        vehicleImage: `https://rslsofttech.com:7000/${vehicle.uploadVehicleImage}`,
        fare:`${fare} rupees`,
        distance,
        time: `${time} min`,
      };
      fareOfVehicles.push(allVehicles);
    }

    res.status(200).json({
      success: true,
      message: 'All Available Rides',
      data: fareOfVehicles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}



// contact box website
const contactUs = async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      requireTLS: true,
      secure: false,
      auth: {
        user: 'hr@rslsofttech.com',
        pass: 'upennynhqtgpdybp'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    var mailOptions = {
      from: 'hr@rslsofttech.com',
      to: 'hr@rslsofttech.com',
      subject: `Contact Us`,
      html: `
      <p>You received new eamil from rsl website.</p>
      <table style="width:50%">
      <tr>
        <td><b>Name</b></td>
        <td>${request.body.name}</td>
      
      </tr>
      <tr>
      <td><b>Email</b></td>
      <td>${request.body.email}</td>
    
    </tr>
    <tr>
    <td><b>Subject</b></td>
    <td>${request.body.subject}</td>
  </tr>
  <tr>
  <tr>
  <td><b>Message</b></td>
  <td>${request.body.message}</td>
  
  </tr>
    </table>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
     
      const user = new User({
        name: request.body.name,
        email:request.body.email,
        phone:request.body.phone,
        message:request.body.message,
        candidates_resume:request.file.filename
      })

      user.save()
      .then(result => {
        response.status(200).send({success:true, msg: "successfully send mail",new_user:result})
      }).catch(e => {
        response.status(400).send({success:false,error:e});
      })
    }
  });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// import User from "../models/userModel.js";
// import nodemailer from 'nodemailer';
// import { Result } from "express-validator";

// export async function insert(request, response) {
 
//   var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     requireTLS: true,
//     secure: false,
//     auth: {
//       user: 'hr@rslsofttech.com',
//       pass: 'upennynhqtgpdybp'
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });

//   var mailOptions = {
//     from: 'hr@rslsofttech.com',
//     to: 'hr@rslsofttech.com',
//     subject: `Contact Us`,
//     html: `
//     <p>You received new eamil from rsl website.</p>
//     <table style="width:50%">
//     <tr>
//       <td><b>Name</b></td>
//       <td>${request.body.name}</td>
    
//     </tr>
//     <tr>
//     <td><b>Email</b></td>
//     <td>${request.body.email}</td>
  
//   </tr>
//   <tr>
//   <td><b>Phone</b></td>
//   <td>${request.body.phone}</td>
// </tr>
// <tr>
// <td><b>Candidates_resume</b></td>
// <p><a href="http://localhost:6700/candidates_resume/${request.file.filename}">link for ${request.body.name}'s resume</a></p>
// </tr>
// <tr>
// <td><b>Message</b></td>
// <td>${request.body.message}</td>

// </tr>
//   </table>`
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
     
//       const user = new User({
//         name: request.body.name,
//         email:request.body.email,
//         phone:request.body.phone,
//         message:request.body.message,
//         candidates_resume:request.file.filename
//       })

//       user.save()
//       .then(result => {
//         response.status(200).send({success:true, msg: "successfully send mail", _data: `http:localhost:4000/candidates_resume/${request.file.filename}` ,
//       new_user:result})
//       }).catch(e => {
//         response.status(400).send({success:false,error:e});
//       })
//     }
//   });

// }
// export async function fetchAll(request, response) {
//   try {
//     const data = await User.find()
//     response.json(data);
//   } catch (error) {
//     response.json({ message: 'Something went wrong' });
//   }
// }








module.exports = {
  getFare,showFareToUsers,contactUs
};
