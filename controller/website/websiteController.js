const rideModel = require('../../models/ridesModel/ridesModel')
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
  
  const getFare = (req, res) => {
    try {
      const { pickupLatitude,pickupLongitude,destinationLatitude,destinationLongitude} = req.body;
      const distance = getDistance(pickupLatitude, pickupLongitude,destinationLatitude,destinationLongitude);
      const duration = getDuration(distance);
      const fare = calculateFare(distance, duration); // Assuming calculateFare is a function that calculates the fare based on the distance and duration.
  
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
  
  module.exports = {getFare}