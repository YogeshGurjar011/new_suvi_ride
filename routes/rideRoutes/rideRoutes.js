//********** CUSTOMER ROUTES **********/
const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const rideController = require('../../controller/rides/rideController');
router.use(function(req,res,next){
    res.header('Access-Controll-Allow-origin','*');
    res.header('Access-Controll-Allow-Methods','*');
    res.header('Access-Controll-Allow-Headers','*');
    next();
})
// Customer App Rides Routes 
router.post('/customer/newRideRequest',rideController.createNewRide);


module.exports = router;