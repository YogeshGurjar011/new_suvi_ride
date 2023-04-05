//********** CUSTOMER ROUTES **********/
const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const customerController = require('../../controller/customer/customerController');
const customerValidation = require("../../middeleware_functions/customerValidation");
router.use(function(req,res,next){
    res.header('Access-Controll-Allow-origin','*');
    res.header('Access-Controll-Allow-Methods','*');
    res.header('Access-Controll-Allow-Headers','*');
    next();
})
// Customer App Routes 
router.post('/customer/custmerLogin',customerController.CustmerLogin);

router.post('/customer/otpVerification',customerController.otpVerification);

router.post('/customer/customerRegistration',customerController.customerRegistration);

router.post('/customer/customerLoginWithSocial',customerController.customerLoginWithSocial);

router.get('/customer/totalUser',customerController.totalUser);

router.patch('/customer/updateUser',customerValidation,customerController.updateUser);

router.delete('/customer/deleteCustomer/:_id',customerController.deleteCustomer);

router.post('/customer/allNearestDrivers',customerController.allNearestDrivers);

router.post('/customer/showFareInCustomer',customerController.showFareInCustomer);

router.post('/customer/riderequest',customerController.riderequest);

router.get('/customer/allRidesByCustomer',customerValidation,customerController.allRidesByCustomer);

router.post('/customer/customerLogout',customerValidation,customerController.customerLogout);

router.post('/customer/customerrRatting',customerController.customerrRatting)

//router.post('/payment',customerController.paymentGetway);

module.exports = router;
