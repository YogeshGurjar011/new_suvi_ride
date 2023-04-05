//********** CUSTOMER ROUTES **********/
const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const path = require('path');
const multer = require('multer');
const driverController = require('../../controller/driver/driverController');
const driverValidation = require('../../middeleware_functions/driverValidation');

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
router.post('/driver/driverdriverDrivingLicence',upload.single('uploadImage'),driverController.driverDrivingLicence);

router.post('/driver/driverVehicleDetails',driverValidation,upload.single('imageOfRegistrationCard'),driverController.driverVehicleDetails);

router.post('/driver/driverAddBankDetails',driverValidation,driverController.driverAddBankDetails);

router.post('/driver/driverTakeSelfie',upload.single('selfie'),driverController.driverTakeSelfie);

router.post('/driver/driverDocumentsVerification',driverValidation,driverController.driverDocumentsVerification);

router.post('/driver/documentsVerificationByAdmin',driverValidation,driverController.checkDriverDocumentsVerificationByAdmin);

router.put('/driver/updateDriverStatus/:_id',driverController.updateDriverStatus);

router.get('/driver/totalDrivers',driverController.totalDrivers);

router.put('/driver/updateCurrentLocation/:_id',driverValidation,driverController.updateDriverCurrentLocation);

router.delete('/driver/deleteDriver/:_id',driverController.deleteDriver);

router.patch('/driver/updatePersonalDetails',driverValidation,upload.single('profilePhoto'),driverController.updatePersonalDetails);

router.post('/driver/driverRatting',driverController.driverRatting);

router.patch('/driver/driverLogout',driverValidation,driverController.driverLogout);

router.post('/driver/driverLoginWithSocial',driverController.driverLoginWithSocial);

module.exports = router;
