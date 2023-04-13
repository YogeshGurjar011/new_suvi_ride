//********** CUSTOMER ROUTES **********/
const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const path = require('path');
const multer = require('multer');
const driverController = require('../../controller/driver/driverController');
const driverValidation = require('../../middeleware_functions/driverValidation');
const websiteController = require('../../controller/website/websiteController');

const storage = multer.diskStorage({
    destination:'adminImages/languageImages',
    filename:(req,file,callback)=>{
        return callback(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage:storage
});;

router.use(function(req,res,next){
    res.header('Access-Controll-Allow-origin','*');
    res.header('Access-Controll-Allow-Methods','*');
    res.header('Access-Controll-Allow-Headers','*');
    next();
})
// Customer App Routes 
router.post('/driver/driverLogin',driverController.driverLogin);

// router.post('/driver/driverAppGenrateotp',driverController.driverAppGenrateotp);
// router.post('/driver/driverAppOtpVerification',driverController.driverAppOtpVerification);
router.post('/driver/drivingLicence',upload.single('uploadImage'),driverController.driverDrivingLicence);

router.post('/driver/vehicleDetails',driverValidation,upload.single('imageOfRegistrationCard'),driverController.driverVehicleDetails);

router.post('/driver/addBankDetails',driverValidation,driverController.driverAddBankDetails);

router.post('/driver/takeSelfie',upload.single('selfie'),driverController.driverTakeSelfie);

router.post('/driver/documentsVerification',driverValidation,driverController.driverDocumentsVerification);

router.post('/driver/documentsVerificationByAdmin',driverValidation,driverController.checkDriverDocumentsVerificationByAdmin);

router.put('/driver/updateDriverStatus/:_id',driverController.updateDriverStatus);

router.get('/driver/totalDrivers',driverController.totalDrivers);

router.put('/driver/updateCurrentLocation',driverValidation,driverController.updateDriverCurrentLocation);

router.delete('/driver/deleteDriver/:_id',driverController.deleteDriver);

router.patch('/driver/updatePersonalDetails',driverValidation,upload.single('profilePhoto'),driverController.updatePersonalDetails);

router.post('/driver/acceptRideRequest',driverValidation,driverController.acceptRideRequest);

router.post('/driver/declineRideRequest',driverValidation,driverController.declineRideRequest);

router.post('/driver/navigateToPickupPoint',driverController.navigateToPickupPoint);

router.post('/driver/startRide',driverController.startRide);

router.post('/driver/reachedToDestination',driverController.reachedToDestination);

router.post('/driver/completeRide/:_id',driverValidation,driverController.endRide);

router.post('/driver/driverRatting',driverValidation,driverController.driverRatting);

router.get('/driver/totalEarning',driverValidation,driverController.totalEarning);

router.get('/driver/getOngoingRide',driverValidation,driverController.getOngoingRide);

router.post('/driver/getAllRides',driverValidation,driverController.getAllRides);

router.get('/driver/getTotalRides',driverValidation,driverController.getTotalRides);

router.post('/driver/writeToUs',driverValidation,driverController.writeToUs);

router.patch('/driver/driverLogout',driverValidation,driverController.driverLogout);

router.get('/driver/getTotalRidesWithStatus',driverValidation,driverController.getTotalRidesWithStatus);

//===================================================================================

router.post('/website/getFare',websiteController.getFare);



module.exports = router;
