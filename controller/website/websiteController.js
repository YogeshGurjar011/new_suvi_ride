const rideModel = require('../../models/ridesModel/ridesModel');
const haversine = require('haversine');

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


//

const showFareToUsers = async (req, res) => {
  try {
    const { pickupLocation,pickupLatitude, pickupLongitude, destinationLocation,destinationLatitude, destinationLongitude } = req.body;
    const vehicleDetails = {};

    // Fetch the fare rates and base fare for all vehicles
    const vehicles = await VehicleTypeWithFareModel.find({});
    for (const vehicle of vehicles) {
      vehicleDetails[vehicle.name] = {
        baseFare: vehicle.baseFare,
        perKmCharge: vehicle.perKmCharge
      };
    }

    // Calculate the distance and duration between the pickup location and the dropoff location
    const distance = getDistanceFromLatLonInKm(pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude);
   // const durationToDropoff = Math.round((distance / 30) * 60);  // Assuming an average speed of 30 km/h

    // Calculate the fare for each vehicle type
    const fare = [];
    for (const vehicle of vehicles) {
      const fare = Math.round(vehicle.baseFare + (distance * vehicle.perKmCharge));
      const allVehicles = {
        vehicleName: vehicle.name,
        vehicleImage: `https://rslsofttech.com:7000/${vehicle.uploadVehicleImage}`,
        fare,
        distance,
        duration: durationToDropoff,
      };
      fare.push({ allVehicles });
    }

    res.status(200).json({
      success: true,
      message: 'All Available Rides',
      data: fare
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false, 
      message: 'Internal server error',
      error:error.message 
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



module.exports = {
  getFare,showFareToUsers
};
