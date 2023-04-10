//********** ADMIN ROUTES **********/
const express = require('express');
const bodyParser = require('body-parser'); 
const multer = require('multer');
const router = express.Router();
const adminScreenCntroller = require('../../controller/admin/adminScreenController');
const path = require('path');
//const customerValidation = require('../token_validation/customerTokenValidation');
router.use(function(req,res,next){
    res.header('Access-Controll-Allow-origin','*');
    res.header('Access-Controll-Allow-Methods','*');
    res.header('Access-Controll-Allow-Headers','*');
    next();
});

const storage = multer.diskStorage({
    destination:'adminImages/languageImages',
    filename:(req,file,callback)=>{
        return callback(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage:storage
});;

// Add Languaes  
router.post('/admin/addLanguages',adminScreenCntroller.addLanguages);

// Get All LAnguages
router.get('/admin/getAllLanguages',adminScreenCntroller.getAllLanguages);

// Get Lanugage By Id
router.get('/admin/languageGetById/:_id',adminScreenCntroller.languageGetById);

// Edit language
router.put('/admin/editLanguage/:_id',adminScreenCntroller.editLanguage);

// Delete Language
router.delete('/admin/deleteLanguage/:_id',adminScreenCntroller.deleteLanguage);

// Add Screens
router.post('/admin/addScreens',adminScreenCntroller.addScreens);

// Get All Screens
router.get('/admin/getAllScreens',adminScreenCntroller.getAllScreens);

// Edit Screens
router.put('/admin/editScreens/:_id',adminScreenCntroller.editScreens);

// Delete Screens
//router.delete('/admin/deleteScreenById/:_id',adminScreenCntroller.deleteScreenById)

// Add Label Codes
router.post('/admin/addLabalCodes',adminScreenCntroller.addNewLabelCodes);

// Get All Labels Codes
router.post('/admin/getAllLabalCodes/:appScreens/:screenName',adminScreenCntroller.getAllLabelCodes);

// Get All Labels Codes By Id 
router.post('/admin/getAllLabelCodesById/:screenName',adminScreenCntroller.getAllLabelCodesById);

// Delete Label Codes 
router.delete('/admin/deleteLabelCodes/:_id',adminScreenCntroller.deleteLabelCodes);

// Get All Screens By Language
router.post('/admin/getAllScreensByLanguage',adminScreenCntroller.getAllScreensByLanguage);

// Get All Screens Of Customer App
router.get('/admin/getAllCustomerScreens',adminScreenCntroller.getAllCustomerScreens);

// Get All Sceens of Driver App
router.get('/admin/getAllDriverScreens',adminScreenCntroller.getAllDriverScreens);

// Get Screens Of Customer App By Id
router.get('/admin/getCustomerScreensById/:_id',adminScreenCntroller.getCustomerScreensById);

// Get Screens Of Driver App By Id
router.get('/admin/getDriverScreensById/:_id',adminScreenCntroller.getDriverScreensById);

// Add New Vehicle Type
router.post('/admin/addVehicleType',upload.single('uploadVehicleImage'),adminScreenCntroller.addVehicleType); 

// Get All vehicle Type
router.get('/admin/getAllvehicleType',adminScreenCntroller.getAllvehicleType);

// Delete Vehical Type
router.delete('/admin/deleteVehicalType/:_id',adminScreenCntroller.deleteVehicalType);

// edit vehicle type
router.put('/admin/updateVehicleDetails/:_id',upload.single('uploadVehicleImage'),adminScreenCntroller.updateVehicleDetails);

// adminGetAllRides
router.get('/admin/adminGetAllRides',adminScreenCntroller.adminGetAllRides);

// admin get all label code
router.get('/admin/adminGetAllScreenDetails/:appScreens/:screenName',adminScreenCntroller.adminGetAllScreenDetails);


module.exports = router;
