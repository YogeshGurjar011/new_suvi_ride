const { required } = require('joi');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const driverBasicDetailsMOdel = require('../../models/driverModel/driverModel/driverModel');
const rideModel = require('../../models/ridesModel/ridesModel');
const rattingModel = require('../../models/rattingModel');
// Genrate OTP 
// const driverAppGenrateotp = async (req, res) => {
//     try {
//         const otpGenrate = Math.floor(1000 + Math.random() * 9000).toString();
//         driverBasicDetailsMOdel.find({ mobileNumber: req.body.mobileNumber }, async (error, result) => {
//             if (error) {
//                 res.status(400).send({
//                     success: false,
//                     successCode: 400,
//                     error: error.message
//                 })
//             }
//             else {
//                 if (!result.length) {
//                     // if mobile number will not find then genrate otp and save mobile number and otp to the database
//                     // Send the OTP to the user's mobile number using Twilio
//                     const accountSid = 'AC8d767139766671cc4f1a31cac838b688';
//                     const authToken = '0474879930e60e7ff6ae56f271851e5f';
//                     const client = new twilio(accountSid, authToken);
//                     const message = await client.messages.create({
//                         body: `Your OTP is ${otpGenrate}`,
//                         from: '+13613488675',
//                         to: `+91 ${req.body.mobileNumber}`,
//                     });
//                     const customerDetails = new driverBasicDetailsMOdel({
//                         language: req.body.language,
//                         mobileNumber: req.body.mobileNumber,
//                         otp: otpGenrate
//                     });
//                     customerDetails.save((error, result) => {
//                         if (error) {
//                             res.status(400).send({
//                                 success: false,
//                                 successCode: 400,
//                                 error: error.message
//                             })
//                         }
//                         else {
//                             res.status(200).send({
//                                 success: true,
//                                 successCode: 200,
//                                 data: result,
//                                 message: 'OTP sent successfully',
//                                 nextScreen: 'otp verification '
//                             })
//                         }
//                     })
//                 }
//                 else {
//                     // else mobile number will find then genrate otp and update otp to the database 
//                     // Send the OTP to the user's mobile number using Twilio
//                     const accountSid = 'AC8d767139766671cc4f1a31cac838b688';
//                     const authToken = '0474879930e60e7ff6ae56f271851e5f';
//                     const client = new twilio(accountSid, authToken);
//                     const message = await client.messages.create({
//                         body: `Your OTP is ${otpGenrate}`,
//                         from: '+13613488675',
//                         to: `+91 ${req.body.mobileNumber}`,
//                     });
//                     const filter = { mobileNumber: req.body.mobileNumber };
//                     const update = {
//                         $set: {
//                             otp: otpGenrate
//                         }
//                     };
//                     const options = { new: true };
//                     const result = await driverBasicDetailsMOdel.updateOne(filter, update, options);
//                     if (result) {
//                         res.status(200).send({
//                             success: true,
//                             successCode: 200,
//                             data: result,
//                             message: 'otp updated successfully',
//                             nextScreen: 'otp verification'
//                         })
//                     }
//                     else {
//                         res.status(400).send({
//                             success: false,
//                             successCode: 400,
//                             message: 'Not able to send otp please resend otp'
//                         })
//                     }
//                 }
//             }
//         })

//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             successCode: 500,
//             message: 'Internal Server Error',
//             error: error.message
//         })
//     }
// }

// OTP Verification
// const driverAppOtpVerification = async (req, res) => {
//     try {
//         if (!req || !res || !req.body || !req.body.mobileNumber || !/^\d{10}$/.test(req.body.mobileNumber)) {
//             return reject({ status: 400, message: 'Please provide a valid 10-digit mobile number.' });
//           }
//         const result = await driverBasicDetailsMOdel.findOne({ mobileNumber: req.body.mobileNumber, language: req.body.language });
//         if (result) {
//             if (result.verificationStatus == "failed") {
//                 res.status(200).send({
//                     success: true,
//                     successCode: 200,
//                     message: 'OTP Verification Done',
//                     results: result,
//                     nextScreen: 'Registration'
//                 })
//             }
//             else {
//                 res.status(200).send({
//                     success: true,
//                     successCode: 200,
//                     message: 'OTP Verification Done',
//                     results: result,
//                     nextScreen: 'Home Screen'
//                 })
//             }
//         }
//         else {
//             res.status(404).send({
//                 success: false,
//                 successCode: 404,
//                 message: 'OTP Verification Failed'
//             })
//         }
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             successCode: 500,
//             message: 'Internal Server Error',
//             error: error.message
//         })
//     }
// }

// driver login api
// const driverLogin = async(req, res) => {
//     return new Promise(async (resolve, reject) => {
//       if (!req || !res || !req.body || !req.body.mobileNumber || !/^\d{10}$/.test(req.body.mobileNumber)) {
//         return reject({ status: 400, message: 'Please provide a valid 10-digit mobile number.' });
//       }

//       try {
//         const { language, mobileNumber } = req.body;

//         const existingUser = await driverBasicDetailsMOdel.find({ mobileNumber }).exec();
//         if (existingUser.length === 0) {
//           const newUser = new driverBasicDetailsMOdel({
//             mobileNumber: mobileNumber,
//             language: language,
//           });

//           await newUser.save();

//           return resolve({
//             status: 200,
//             data: {
//               success: true,
//               successCode :200,
//               message: 'New Driver added successfully',
//               nextScreen: 'registration',
//               data: newUser,
//             },
//           });
//         } else {
//           const result = existingUser[0];
//           if (result.verificationStatus == "failed") {
//             return resolve({
//               status: 200,
//               data: {
//                 success: true,
//                 successCode:200,
//                 message:'This Driver verify its number already',
//                 nextScreen: 'registration',
//               },
//             });
//           } else {
//             return resolve({
//               status: 200,
//               data: {
//                 success: true,
//                 successCode:'Driver already Registred',
//                 nextScreen: 'welcome',
//                 result: result,
//               },
//             });
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         return reject({ status: 500, message: 'Internal Server Error' });
//       }
//     })
//       .then((response) => {
//         const { status, data } = response;
//         return res.status(status).json(data);
//       })
//       .catch((error) => {
//         const { status, message } = error;
//         return res.status(status).json({ message });
//       });
//   };

// Driver Login
const driverLogin = async (req, res) => {
    try {
        const { mobileNumber, language, deviceToken } = req.body;
        if (!mobileNumber || !/^\+\d{1,3}\d{10}$/.test(mobileNumber)) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'Please provide a valid mobile number in the format of +911234567890.'
            });
        }
        if (!language) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'Please provide a valid language code.'
            });
        }
        if (!deviceToken) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'Please provide a valid fcmToken.'
            });
        }
        const result = await driverBasicDetailsMOdel.find({ mobileNumber });
        if (!result.length) {
            const newDriver = new driverBasicDetailsMOdel({
                mobileNumber:mobileNumber,
                language:language,
                deviceToken:deviceToken // save deviceToken when creating new driver
            })
            const newDriverResult = await newDriver.save();
            if (newDriverResult) {
                res.status(200).send({
                    success: true,
                    data: { language: newDriverResult.language, mobileNumber: newDriverResult.mobileNumber},
                    message: 'Mobile Number Verified',
                    nextScreen: 'registration'
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Mobile Number Is Not Verified '
                })
            }
        }
        else {
            if (result[0].verificationStatus === 'failed') {
                res.status(200).send({
                    success: true,
                    message: 'Driver With This Number Is Already Exits',
                    data: {
                        mobileNumber: result[0].mobileNumber,
                        language: result[0].language,
                        fullName: result[0].drivingLicence.fullName,
                        gender: result[0].drivingLicence.gender,
                        selfie: result[0].selfie,
                        Status: result[0].Status,
                        token: result[0].token,
                        // deviceToken: result[0].deviceToken
                    },
                    nextScreen: 'registration'
                })
            }
            else {
                res.status(200).send({
                    success: true,
                    successCode: 200,
                    message: 'This Driver Is Already Registred',
                    data: result,
                    nextScreen: 'welcome'
                })
            }
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

// Registration 
// Registration  = Driver Driving Licence Details
const driverDrivingLicence = async (req, res) => {
    try {
        const { mobileNumber, fullName, address, gender, licenceNumber, issuedDate, validitiy } = req.body;
        //const { uploadImage } = req.file.filename;
        // if (!fullName) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please Enter Valid FullName'
        //     })
        // }
        // if (!address) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter Address'
        //     })
        // }
        // if (!gender) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'PLease select Gender'
        //     })
        // }
        // if (!licenceNumber) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'PLease enter Licence Number'
        //     })
        // }
        // if (!issuedDate) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'PLease enter Issued Date'
        //     })
        // }
        // if (!validitiy) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter validitiy'
        //     })
        // }
        const result = await driverBasicDetailsMOdel.find({ mobileNumber: mobileNumber })
            //.populate({ path: 'language', select: ['name'] });;
        if (result) {
            
            const filter = { mobileNumber: mobileNumber };
            const update = { $set: { 'drivingLicence.fullName': fullName, 'drivingLicence.address': address, 'drivingLicence.gender': gender, 'drivingLicence.licenceNumber': licenceNumber, 'drivingLicence.issuedDate': issuedDate, 'drivingLicence.validitiy': validitiy, 'drivingLicence.uploadImage': req.file.filename } };
            const options = { new: true };
            const result = await driverBasicDetailsMOdel.findOneAndUpdate(filter, update, options)
               // .populate({ path: 'language', select: ['name'] })
            if (result) {
                const { _id, language, mobileNumber, otp, fullName, verificationStatus, vehicleType, currentLocation, hasRide, currentRide, passengerCapacity, Status } = result;
                const token = jwt.sign({ driverId: _id, language: language.name, mobileNumber: mobileNumber, fullName: fullName, verificationStatus: verificationStatus, vehicleType: vehicleType, currentLocation: currentLocation, hasRide: hasRide, currentRide: currentRide, passengerCapacity: passengerCapacity, Status: Status },
                    "secretKey",);
                result.token = token
                const updateToken = await result.save();
                if(updateToken){
                    res.status(200).send({
                        success: true,
                        //successCode: 200,
                        //data: result,
                        message: 'Driving Licence Added Successfully',
                        nextFiled:"Vehicle Details",
                        token
                    });
                }
                else{
                    res.status(400).send({
                        success:false,
                        message:"not able to save token in database"
                    })
                }
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Please Enter Valid Driving Licence Details'
                })
            }
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Data Not Found Of This User'
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

// Registration  = Driver Vehicle Details
const driverVehicleDetails = async (req, res) => {
    try {
        const { vehicleModelNumber, registrationID, dateofRegistration, registrationValidity } = req.body;

        // Get token from header (Authorication)
        const token = req.headers.authorization.split(' ')[1];

        // Decode token to get Mobile Number 
        const decodedToken = jwt.decode(token);
        const mobileNumber = decodedToken.mobileNumber;

        // if (!vehicleModelNumber) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter Vehicle Model Number'
        //     })
        // }
        // if (!registrationID) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter Registration ID'
        //     })
        // }
        // if (!dateofRegistration) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter Date of Registration'
        //     })
        // }
        // if (!registrationValidity) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter Registration Validity'
        //     })
        // }
        const result = await driverBasicDetailsMOdel.findOne({ mobileNumber })
            .populate({ path: 'language', select: ['name'] });;
        if (result) {
            const filter = { mobileNumber: mobileNumber };
            const update = { $set: { 'vehiclesDetails.vehicleModelNumber': vehicleModelNumber, 'vehiclesDetails.registrationID': registrationID, 'vehiclesDetails.dateofRegistration': dateofRegistration, 'vehiclesDetails.registrationValidity': registrationValidity, 'vehiclesDetails.imageOfRegistrationCard': req.file.filename } };
            const options = { new: true };
            const results = await driverBasicDetailsMOdel.findOneAndUpdate(filter, update, options)
                .populate({ path: 'language', select: ['name'] });;
            if (results) {
                res.status(200).send({
                    success: true,
                    //successCode: 200,
                    //data: results,
                    message: 'Vehicle Details added Successfully',
                    nextFiled:'Add Bank Details'
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Please Enter Valid Vehicle Details'
                })
            }
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Data Not Found Of This User '
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

// Registration  = Add Bank Details   
const driverAddBankDetails = async (req, res) => {
    try {
        const { accountNumber, IFSC } = req.body;
        // Get token from header (Authorication)
        const token = req.headers.authorization.split(' ')[1];

        // Decode token to get Mobile Number 
        const decodedToken = jwt.decode(token);
        const mobileNumber = decodedToken.mobileNumber;
        // if (!accountNumber) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter Account Number'
        //     });
        // }
        // if (!IFSC) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please enter IFSC Code'
        //     })
        // }
        const result = await driverBasicDetailsMOdel.find({ mobileNumber: mobileNumber })
            .populate({ path: 'language', select: ['name'] });;
        if (result) {
            const filter = { mobileNumber: mobileNumber };
            const update = { $set: { 'bankDetails.accountNumber': accountNumber, 'bankDetails.IFSC': IFSC } };
            const options = { new: true };
            const updatedResult = await driverBasicDetailsMOdel.findOneAndUpdate(filter, update, options)
                .populate({ path: 'language', select: ['name'] });;
            if (updatedResult) {
                res.status(200).send({
                    success: true,
                   // successCode: 200,
                   // data: updatedResult,
                    message: 'Bank Details added Successfully',
                    nextFiled:"Take Selfie"
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Please Enter Valid Bank Details'
                })
            }
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Data Not Found For This User'
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

// Registration  = Take Selfie
// const driverTakeSelfie = async(req,res)=>{
//     try {
//         const result = await driverBasicDetailsMOdel.find({ mobileNumber : req.body.mobileNumber });
//         console.log(result);
//         if(result){
//             const filter = {mobileNumber:req.body.mobileNumber};
//             const update = {selfie:req.file.filename};
//             const options = {new:true};
//             const results = await driverBasicDetailsMOdel.findOneAndUpdate(filter,update,options);
//             if(results){
//                 res.status(200).send({
//                     success:true,
//                     data:results,
//                     message:'selfie uploaded'
//                 })
//             }
//             else{
//                 res.status(400).send({
//                     success:false,
//                     message:'Please Take Proper Selfie'
//                 })
//             }
//         }
//         else{
//             res.status(404).send({
//                 success:false,
//                 message:'Data Not Found For This User'
//             })
//         }
//     } catch (error) {
//         res.status(500).send({
//             success:false,
//             error:error.message
//         })
//     }
// }

const driverTakeSelfie = async (req, res) => {
    try {
        // Get token from header (Authorication)
        const token = req.headers.authorization.split(' ')[1];

        // Decode token to get Mobile Number 
        const decodedToken = jwt.decode(token);
        const mobileNumber = decodedToken.mobileNumber;

        // if (!mobileNumber) {
        //     return res.status(400).send({
        //         success: false,
        //         successCode: 400,
        //         message: 'Please provide a mobile number'
        //     });
        // }
        const result = await driverBasicDetailsMOdel.find({ mobileNumber: mobileNumber })
            .populate({ path: 'language', select: ['name'] });
        if (result && result.length > 0) {
            const filter = { mobileNumber };
            const update = { selfie: req.file.filename };
            const options = { new: true };
            const results = await driverBasicDetailsMOdel.findOneAndUpdate(filter, update, options)
                .populate({ path: 'language', select: ['name'] });
            if (results) {
                res.status(200).send({
                    success: true,
                    // successCode: 200,
                    // data: results,
                    message: 'Selfie uploaded successfully',
                    nextFiled:"Make Payment"
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Please Take Proper Selfie'
                })
            }
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Data Not Found For This User'
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

//Check Driver Documents Verification 
const driverDocumentsVerification = async (req, res) => {
    try {
        // Get token from header (Authorication)
        const token = req.headers.authorization.split(' ')[1];

        // Decode token to get Mobile Number 
        const decodedToken = jwt.decode(token);
        const mobileNumber = decodedToken.mobileNumber;

        const result = await driverBasicDetailsMOdel.findOne({ mobileNumber: mobileNumber });
        // console.log(drivingLicence.verification)
        if (!result.length === 0) {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Data Not Found With This MObile NUmber'
            })
        }
        else {
            const { verificationStatus, drivingLicence, vehiclesDetails, bankDetails } = result
            if (drivingLicence.verification !== 'verified') {
                return res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Your Driving Licence Verification is pendding it will take some time to verify'
                })
            }
            if (vehiclesDetails.verification !== 'verified') {
                return res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Your Vehicles Details Verification is pendding it will take some time to verify'
                })
            }
            if (bankDetails.verification !== 'verified') {
                return res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Your Bank Details Verification is pendding it will take some time to verify'
                })
            }

            if (verificationStatus === 'verified' && drivingLicence.verification === 'verified' &&
                vehiclesDetails.verification === 'verified' && bankDetails.verification === 'verified') {
                res.status(200).send({
                    success: true,
                    successCode: 200,
                    data: result,
                    message: 'Registration successfull',
                    nextScreen: 'Home Screen'
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'You have to wait for an houre We will verify your documents'
                })
            }
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

//Check Driver Documents Verification By Admin
const checkDriverDocumentsVerificationByAdmin = async (req, res) => {
    try {
        // Get token from header (Authorication)
        const token = req.headers.authorization.split(' ')[1];

        // Decode token to get driver id
        const decodedToken = jwt.decode(token);
        const driverId = decodedToken.driverId;

        if (!driverId) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'please provide id'
            });
        }
        if (!req.body.drivingLicenceVerification || !req.body.vehiclesDetailsVerification || !req.body.bankDetailsVerification) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'please select write option'
            });
        }

        const result = await driverBasicDetailsMOdel.findOneAndUpdate(
            { _id: req.params._id },
            {
                $set: {
                    'drivingLicence.verification': req.body.drivingLicenceVerification,
                    'vehiclesDetails.verification': req.body.vehiclesDetailsVerification,
                    'bankDetails.verification': req.body.bankDetailsVerification,
                    verificationStatus: (req.body.drivingLicenceVerification === 'success' && req.body.vehiclesDetailsVerification === 'success' && req.body.bankDetailsVerification === 'success') ? 'success' : 'pending'
                }
            },
            { new: true }
        );

        console.log(result);

        return res.status(200).send({
            success: true,
            successCode: 200,
            message: 'driver registration successfull',
            nextScreen: '',
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// update driver status
const updateDriverStatus = async (req, res) => {
    try {
        const { _id } = req.params; // assuming the driver ID is passed as a parameter in the request URL
        if (!_id) {
            return res.status(400).send({ message: 'Please provide driver id' });
        }
        if (req.body.Status !== 'online' && req.body.Status !== 'offline') {
            return res.status(400).send({ message: 'The driver status can be online or offline' })
        }
       const id =  { _id }
       const update =  {
            $set: {
                'Status': req.body.Status
            }
        }
        const options = { new: true }
        const result = await driverBasicDetailsMOdel.findOneAndUpdate( id,update,options);
        if (result) {
            res.status(200).send({
                success: true,
                //successCode: 200,
                data: {Status:result.Status},
                message: 'driver status updated successfully'
            })
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'data not found with this id'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

// total drivers
const totalDrivers = (req, res) => {
    return new Promise((resolve, reject) => {
        if (!req || !res) {
            return reject({ success: false, successCode: 400, message: 'Bad Request' });
        }

        try {
            driverBasicDetailsMOdel
                .find({})
                .populate({ path: 'language', select: ['language'] })
                .exec((err, results) => {
                    if (err) {
                        return reject({ success: false, successCode: 500, message: 'Internal Server Error' });
                    }

                    const data = results.length;
                    return resolve({
                        status: 200,
                        data: {
                            success: true,
                            successCode: 200,
                            message: 'All Drivers',
                            total_drivers: data,
                            results: results
                        },
                    });
                });
        } catch (error) {
            console.error(error);
            return reject({ success: false, successCode: 500, message: 'Internal Server Error' });
        }
    })
        .then((response) => {
            const { status, data } = response;
            return res.status(status).json(data);
        })
        .catch((error) => {
            const { status, message } = error;
            return res.status(status).json({ message });
        });
};

// update driver current location 
const updateDriverCurrentLocation = async (req, res) => {
    try {
        const { _id } = req.params;
        const { latitude, longitude } = req.body;

        // Check if the latitude and longitude values are valid numbers
        if (!isFinite(latitude) || !isFinite(longitude)) {
            throw new Error('Latitude and longitude must be valid numbers');
        }

        // Find the driver by ID
        const driver = await driverBasicDetailsMOdel.findById({_id:_id});

        if (!driver) {
            return res.status(404).json({
                success: false,
                successCode: 404,
                message: 'Driver not found',
            });
        }

        if (driver.status !== 'online') {
            return res.status(400).json({
                success: false,
                successCode: 400,
                message: 'Driver is offline',
            });
        }

        // Update the driver's current location
        driver.currentLocation = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        // Save the updated driver
        const updatedDriver = await driver.save();

        res.status(200).json(updatedDriver);
    } catch (error) {
        res.status(500).json({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


// Delete Driver
const deleteDriver = async (req, res) => {
    try {
        const _id = req.params._id
        const result = await driverBasicDetailsMOdel.findByIdAndDelete({ _id })
        if (result) {
            res.status(200).send({
                success: true,
                successCode: 200,
                data: result,
                message: 'Driver deleted successfully'
            })
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Deriver not found with this id'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

// Driver Update Personal Details
const updatePersonalDetails = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.decode(token);
        const driverId = decodeToken.driverId;

        const mobileNumber = req.body.mobileNumber
        const fullName = req.body.fullName
        const address = req.body.address

        if (mobileNumber && !/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'Please provide a valid 10-digit mobile number.'
            });
        }
        if (fullName && fullName.trim().length < 2) {
            return res.status(400).send({
                success: false,
                successCode: 400,
                message: 'Please Enter Valid FullName'
            })
        }

        const result = await driverBasicDetailsMOdel.find({ driverId })
            .populate({ path: "language", select: ["name"] });
        if (result) {
            const filter = { driverId }
            const update = {}
            if (req.file) {
                update.profilePhoto = req.file.filename;
            }
            if (mobileNumber) {
                update.mobileNumber = mobileNumber;
            }
            if(fullName) {
                update['drivingLicence.fullName'] = fullName;
            }
            if(address) {
                update['drivingLicence.address'] = address;
            }
            const options = { new: true }
            const selectedFields = { profilePhoto: 1, mobileNumber: 1, 'drivingLicence.fullName': 1, 'drivingLicence.address': 1 }
            const updatedResult = await driverBasicDetailsMOdel.findOneAndUpdate(filter, update, options).select(selectedFields)
                .populate({ path: 'language', select: ['name'] });
            if (updatedResult) {
                res.status(200).send({
                    success: true,
                    successCode: 200,
                    message: 'Personal Details Updated Successfully',
                    data: [updatedResult]
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    message: 'Cant Update Personal Details'
                })
            }
        }
        else {
            res.status(404).send({
                success: false,
                successcode: 404,
                message: 'Data not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Ratting 
const driverRatting = async (req, res) => {
    try {
        const { rideId, driverId, driverRating } = req.body;
        const findRide = await rideModel.findById(rideId);
        if (!findRide) {
            return res.status(404).send({
                success: false,
                message: "Ride not found"
            });
        }
        // Check if the ride was completed
        if (findRide.status !== "Completed") {
            return res.status(400).send({
                success: false,
                message: "This ride has not been completed yet"
            });
        }
        // Check if the driver was assigned to this ride
        if (findRide.driverId.toString() !== driverId) {
            return res.status(400).send({
                success: false,
                message: "This driver was not assigned to this ride"
            });
        }
        const rate = new rattingModel({
            customerId: findRide.customerId,
            driverId: driverId,
            ride: rideId,
            customerRating: null,
            driverRating: driverRating
        });
        const rattingResult = await rate.save();
        if (rattingResult) {
            res.status(200).send({
                success: true,
                message: "Rating submitted successfully"
            });
        } else {
            res.status(400).send({
                success: false,
                message: "Rating not submitted"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
// Logout Driver
const driverLogout = async (req, res) => {
    try {
        // Get token from header (Authorication)
        const token = req.headers.authorization.split(' ')[1];

        // Decode token to get driver id
        const decodedToken = jwt.decode(token);
        const driverId = decodedToken.driverId;

        // Find the driver by ID
        const driver = await driverBasicDetailsMOdel.findById(driverId);

        if (!driver) {
            return res.status(404).json({
                success: false,
                successCode: 404,
                message: 'Driver not found',
            });
        }

        // Update driver status to offline
        driver.Status = 'offline';
        await driver.save();

        // Invalidate the driver's token
        await driverBasicDetailsMOdel.updateOne({ _id: driver._id }, { $unset: { token: 1 } });

        // Return success response
        return res.status(200).json({
            success: true,
            // successCode: 200,
            message: 'Logout successful',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            successCode: 500,
            error: error.message,
            message: 'Internal server error',
        });
    }
};


// const driverAddBankDetails = async (req, res) => {
//     try {
//         const {mobileNumber,accountNumber,IFSC} = req.body;
//         // Validate request parameters
//         if (!accountNumber) {
//             return res.status(400).send({ message: 'Invalid account number' });
//         }

//         if (!IFSC) {
//             return res.status(400).send({ message: 'Please provide IFSC code' });
//         }

//         // Find driver by mobile number
//         const driver = await driverBasicDetailsMOdel.findOne({ mobileNumber }).populate({ path: 'language', select: ['language'] });

//         if (!driver) {
//             return res.status(422).send({ message: 'Driver not found for given mobile number' });
//         }

//         // Update driver bank details
//         const updatedDriver = await driverBasicDetailsMOdel.findOneAndUpdate(
//             { mobileNumber },
//             {
//                 $set: {
//                     "bankDetails.accountNumber": accountNumber,
//                     "bankDetails.IFSC": IFSC
//                 }
//             },
//             { new: true }
//         ).populate({ path: 'language', select: ['language'] });

//         console.log(updatedDriver);

//         // Send response with updated driver details
//         return res.status(200).send({
//             message: 'Driver bank details updated successfully',
//             nextScreen: 'Admin verification',
//             data: updatedDriver,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send({ message: 'Internal server error' });
//     }
// }

// Customer Login With Social 
const driverLoginWithSocial = async (req, res) => {
    try {
        driverBasicDetailsMOdel.findOne({ socialId: req.body.socialId, socialMediaType: req.body.socialMediaType }, (error, result) => {
            if (error) {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    error: error.message
                })
            }
            else {
                if (result) {
                    res.status(200).send({
                        success: true,
                        successCode: 200,
                        data: result,
                        message: 'You Already logedIn',
                        nextScreen: 'Welcome Screen'
                    })
                } else {

                    const details = new driverBasicDetailsMOdel({
                        language: req.body.language,
                        socialId: req.body.socialId,
                        socialMediaType: req.body.socialMediaType,
                        fullName: req.body.fullName,
                        email: req.body.email
                    });
                    details.save((error, result) => {
                        if (error) {
                            res.status(400).send({
                                success: false,
                                successCode: 400,
                                error: error.message
                            })
                        }
                        else {
                            res.status(200).send({
                                success: true,
                                successCode: 200,
                                data: result,
                                message: "Login Successfully"
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

module.exports = {

    driverLogin,
    driverDrivingLicence, driverVehicleDetails, driverAddBankDetails, driverTakeSelfie,
    driverDocumentsVerification, checkDriverDocumentsVerificationByAdmin, updateDriverStatus,
    totalDrivers, updateDriverCurrentLocation, deleteDriver, driverLogout,updatePersonalDetails,
    driverRatting,driverLoginWithSocial
}
