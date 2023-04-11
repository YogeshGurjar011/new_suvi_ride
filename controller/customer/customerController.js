const { required } = require('joi');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const cfSdk = require('cashfree-sdk');
const customerBasicDetailsModel = require('../../models/customerModel/customerModel/customerBasicDetailsModel')
const driverBasicDetailsMOdel = require('../../models/driverModel/driverModel/driverModel');
const customerRidesModel = require('../../models/ridesModel/ridesModel.js');
const VehicleTypeWithFareModel = require('../../models/adminModel/adminScreenModel/adminVehicalTypeModel');
const ratingModel = require('../../models/rattingModel');
const geolib = require('geolib');
const NodeGeocoder = require('node-geocoder');
// const FCM = require('fcm-node');
// const serverKey = 'AAAAjBZozHE:APA91bF2n5bBmQToPuoUowPFFWpfPx0PsJEwNjanwmiLR4YWVgSy3T6s9S7yKNQoQHNKUEXgOLE35BNrO2OfthgM02MlRDD6lpaCLJZceqCrW51TPxjFqRV4DEKVz6IJghCxqKl44hGP';
// const fcm = new FCM(serverKey);
const admin = require('firebase-admin');
const serviceAccount1 = require('../../middeleware_functions/suviriderider-5db2f-firebase-adminsdk-r98pp-4a87d447f6.json');
const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: 'https://suviridecustomer.firebaseio.com'
}, 'app1');
const app1Messaging = admin.messaging(app1);


// Customer Genrate OTP 
// const genrateotp = async (req, res) => {
//     try {
//         const otpGenrate = Math.floor(1000 + Math.random() * 9000).toString();
//         customerBasicDetailsModel.find({ mobileNumber: req.body.mobileNumber }, async (error, result) => {
//             if (error) {
//                 res.status(400).send({
//                     success: false,
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
//                         to:`+91 ${req.body.mobileNumber}`,
//                     });
//                     const customerDetails = new customerBasicDetailsModel({
//                         language:req.body.language,
//                         mobileNumber:req.body.mobileNumber,
//                         otp:otpGenrate
//                     });
//                     customerDetails.save((error,result)=>{
//                         if(error){
//                             res.status(400).send({
//                                 success:false,
//                                 error:error.message
//                             })
//                         }
//                         else{
//                             res.status(200).send({
//                                 success:true,
//                                 data:result,
//                                 message:'OTP sent successfully',
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
//                         to:`+91 ${req.body.mobileNumber}`,
//                     });
//                     const filter = {mobileNumber:req.body.mobileNumber};
//                     const update = {$set:{
//                         otp:otpGenrate
//                     }};
//                     const options = {new:true};
//                     const result = await customerBasicDetailsModel.updateOne(filter,update,options);
//                     if(result){
//                         res.status(200).send({
//                             success:true,
//                             data:result,
//                             message:'otp updated successfully',
//                             nextScreen: 'otp verification'
//                         })
//                     } 
//                     else{
//                         res.status(400).send({
//                             success:false,
//                             message:'not able to send otp please resend otp'
//                         })
//                     }
//                 }
//             }
//         })

//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             error: error.message
//         })
//     }
// }

// const genrateotp = async (req, res) => {
//     try {
//         const { language, mobileNumber } = req.body;
//         if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
//             return res.status(400).send({ message: "Please provide a valid 10-digit mobile number." });
//         }

//         const existingUser = await customerBasicDetailsModel.find({ mobileNumber }).exec();
//         if (existingUser.length === 0) {
//             const newUser = new customerBasicDetailsModel({
//                 mobileNumber: mobileNumber,
//                 language: language,
//                 // email:"",
//                 // socialId:"",
//                 // socialMediaType:""
//             })

//             await newUser.save()
//             return res.status(200).json({
//                 success: true,
//                 message: "User added successfully",
//                 nextScreen: "registration",
//                 data: newUser
//             })
//         }
//         else {
//             const result = existingUser[0]
//             if (result.fullName == "") {
//                 return res.status(200).json({
//                     success: true,
//                     nextScreen: "registration"
//                 })
//             }
//             else {
//                 return res.status(200).json({
//                     success: true,
//                     nextScreen: "welcome",
//                     result: result
//                 })
//             }
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             error
//         })
//     }
// }
// const genrateotp = async (req, res) => {
//     try {
//         const { language, mobileNumber } = req.body;
//         if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
//             return res.status(400).send({ message: "Please provide a valid 10-digit mobile number." });
//         }
//         const existingUser = await customerBasicDetailsModel.find({ mobileNumber }).exec();
//         if (existingUser.length === 0) {
//             const newUser = new customerBasicDetailsModel({
//                 mobileNumber: mobileNumber,
//                 language: language,
//                 // email:"",
//                 // socialId:"",
//                 // socialMediaType:""
//             })
//             await newUser.save()
//             return res.status(200).json({
//                 success: true,
//                 successCode: 200,
//                 message: "User added successfully",
//                 data: newUser,
//                 nextScreen: "registration",
//             })
//         }
//         else {
//             const result = existingUser[0]
//             if (result.fullName == "") {
//                 return res.status(200).json({
//                     success: true,
//                     successCode: 200,
//                     nextScreen: "registration"
//                 })
//             }
//             else {
//                 return res.status(200).json({
//                     success: true,
//                     successCode: 200,
//                     nextScreen: "welcome",
//                     result: result
//                 })
//             }
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             successCode: 500,
//             message: 'Internal Server Error',
//             error: error.message
//         })
//     }
// }

// Customer Login

const CustmerLogin = async (req, res) => {
  return new Promise(async (resolve, reject) => {
  if (!req || !res || !req.body || !req.body.mobileNumber || !/^\d{10}$/.test(req.body.mobileNumber)) {
  return reject({ status: 400, message: 'Please provide a valid 10-digit mobile number.' });
  }
  try {
    const { language, mobileNumber, fcmToken } = req.body;
  
    const existingUser = await customerBasicDetailsModel.find({ mobileNumber })
    .populate({ path: "language", select: ["name"] })
    .exec();
    console.log(existingUser)
    if (existingUser.length === 0) {
      const newUser = new customerBasicDetailsModel({
        mobileNumber: mobileNumber,
        language: language,
        fcmToken: fcmToken
        // email:"",
        // socialId:"",
        // socialMediaType:""
      });
  
      await newUser.save();
  
      return resolve({
        status: 200,
        data: {
          success: true,
          successCode: 200,
          message: 'New User added successfully',
          nextScreen: 'registration',
          data: newUser,
        },
      });
    } else {
      const result = existingUser[0];
      result.fcmToken = fcmToken;
      await result.save();
  
      if (result.fullName == '') {
        return resolve({
          status: 200,
          data: {
            success: true,
            successCode: 200,
            message: 'This user verify its number already',
            nextScreen: 'registration',
            data:{ _id:result._id, language:result.language._id, fullName:result.fullName, mobileNumber:result.mobileNumber,email:result.email,fcmToken:result.fcmToken, token:result.token}
          },
        });
      } else {
        const token = jwt.sign({ userId: result._id, mobileNumber: result.mobileNumber,language: result.language.name, fullName: result.fullName, email: result.email  },  "theseissecretkey");
        result.token = token;
        await result.save();
        return resolve({
          status: 200,
          data: {
            success: true,
            successCode: 200,
            message: "User already Registred",
            nextScreen: 'permission',
            data:{ _id:result._id, language:result.language._id, fullName:result.fullName, mobileNumber:result.mobileNumber,email:result.email,fcmToken:result.fcmToken, token:result.token}
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    return reject({ status: 500, message: 'Internal Server Error' });
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

// const CustmerLogin = async(req, res) => {
//     return new Promise(async (resolve, reject) => {
//       if (!req || !res || !req.body || !req.body.mobileNumber || !/^\d{10}$/.test(req.body.mobileNumber)) {
//         return reject({ status: 400, message: 'Please provide a valid 10-digit mobile number.' });
//       }
  
//       try {
//         const { language, mobileNumber,fcmToken } = req.body;
  
//         const existingUser = await customerBasicDetailsModel.find({ mobileNumber }).exec();
//         if (existingUser.length === 0) {
//           const newUser = new customerBasicDetailsModel({
//             mobileNumber: mobileNumber,
//             language: language,
//             fcmToken:fcmToken
//             // email:"",
//             // socialId:"",
//             // socialMediaType:""
//           });
  
//           await newUser.save();
  
//           return resolve({
//             status: 200,
//             data: {
//               success: true,
//               successCode :200,
//               message: 'New User added successfully',
//               nextScreen: 'registration',
//               data: newUser,
//             },
//           });
//         } else {
//           const result = existingUser[0];
//           if (result.fullName == '') {
//             return resolve({
//               status: 200,
//               data: {
//                 success: true,
//                 successCode:200,
//                 message:'This user verify its number already',
//                 nextScreen: 'registration',
//                 data:result
//               },
//             });
//           } else {
//             return resolve({
//               status: 200,
//               data: {
//                 success: true,
//                 successCode:200,
//                 message: "User already Registred",
//                 nextScreen: 'permission',
//                 data: result,
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

// OTP Verification
const otpVerification = async (req, res) => {
    try {
        const result = await customerBasicDetailsModel.findOne({ mobileNumber: req.body.mobileNumber, otp: req.body.otp });
        if (result) {
            if (result.fullName == "") {
                res.status(200).send({
                    success: true,
                    message: 'OTP Verification Done',
                    results: result,
                    nextScreen: 'Registration'
                })
            }
            else {
                res.status(200).send({
                    success: true,
                    message: 'OTP Verification Done',
                    results: result,
                    nextScreen: 'Welcome Screen'
                })
            }
        }
        else {
            res.status(404).send({
                success: false,
                message: 'OTP Verification Failed'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

// Registration 
// const customerRegistration = async (req, res) => {
//     try {
//         const { mobileNumber, fullName, email } = req.body;
//         //validate FullName 
//         if (!fullName || fullName.trim().length < 2) {
//             return res.status(400).send({
//                 message: 'Please Enter Valid FullName'
//             })
//         }
//         //Validate Email
//         if (email && !/^\S+@\S+\.\S+$/.test(email)) {
//             return res.status(400).send({
//                 message: 'Please Enter Valid Email'
//             })
//         }
//         const result = await customerBasicDetailsModel.find({ mobileNumber: mobileNumber });
//         if (result) {
//             const filter = { mobileNumber: mobileNumber };
//             const update = { $set: { fullName: fullName, email: email } };
//             const options = { new: true };
//             const result = await customerBasicDetailsModel.updateOne(filter, update, options);
//             if (result) {
//                 res.status(200).send({
//                     success: true,
//                     successCode: 200,
//                     data: result,
//                     message: 'Registra Successfully'
//                 })
//             }
//             else {
//                 res.status(400).send({
//                     success: false,
//                     successCode: 400,
//                     message: 'Please Enter Valid Details'
//                 })
//             }
//         }
//         else {
//             res.status(404).send({
//                 success: false,
//                 successCode: 404,
//                 message: 'Data Not Found'
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
// const customerRegistration = (req, res) => {
//     const { mobileNumber, fullName, email } = req.body;
  
//     // Check if fullName is valid
//     if (!fullName || fullName.trim().length < 2) {
//       return res.status(400).send({ message: "Invalid fullName" });
//     }
  
//     // Check if email is valid
//     if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//       return res.status(400).send({ message: "Invalid email" });
//     }
  
//     customerBasicDetailsModel
//       .findOneAndUpdate(
//         { mobileNumber },
//         { $set: { fullName, email } },
//         { new: true }
//       )
//       .populate({ path: "language", select: ["language"] })
//       .then((result) => {
//         if (!result) {
//           return Promise.reject({ status: 422, message: "Mobile number not found" });
//         }
//         const { _id, language, mobileNumber: resultMobile, otp, socialId, socialMediaType ,fullName} =
//           result;
//         console.log(result)
//         // Generate JWT
//         const token = jwt.sign(
//           { userId: _id, mobileNumber: resultMobile, language:language, fullName:fullName},
//           "theseissecretkey"
//         );
  
//         // Save token to database
//         result.token = token;
//         return result.save().then(() => {
//           return Promise.resolve({
//             message: "User registration successful",
//             nextScreen: "welcome",
//             data: { _id, language: language.language, fullName, mobileNumber: resultMobile, otp, email, socialId, socialMediaType, token },
//           });
//         });
//       })
//       .then((data) => {
//         return res.status(200).send(data);
//       })
//       .catch((error) => {
//         console.error(error);
//         if (error.status) {
//           return res.status(error.status).send({ message: error.message });
//         }
//         return res.status(500).send({ message: "Internal Server Error" });
//       });
//   };
const customerRegistration = (req, res) => {
    const { mobileNumber, fullName, email } = req.body;
  
    // Check if fullName is valid
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).send({ message: "Invalid fullName" });
    }
  
    // Check if email is valid
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).send({ message: "Invalid email" });
    }
  
    customerBasicDetailsModel
      .findOneAndUpdate(
        { mobileNumber },
        { $set: { fullName, email } },
        { new: true }
      )
      .populate({ path: "language", select: ["name"] })
      .then((result) => {
        if (!result) {
          return Promise.reject({ status: 422, message: "Mobile number not found" });
        }
        const { _id, language, mobileNumber: resultMobile, otp, socialId, socialMediaType ,fullName,email} =
          result;
         //console.log(result)
        // Generate JWT
        const token = jwt.sign(
          { userId: _id, mobileNumber: resultMobile, language:language.name, fullName:fullName,email:email},
          "theseissecretkey"
        );
  
        // Save token to database
        result.token = token;
        return result.save().then(() => {
          return Promise.resolve({
            message: "User registration successful",
            nextScreen: "permission",
            data: { _id, language: language.name, fullName, mobileNumber: resultMobile, otp, email, socialId, socialMediaType, token },
          });
        });
      })
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((error) => {
        console.error(error);
        if (error.status) {
          return res.status(error.status).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal Server Error" });
      });
  };

// Customer Login With Social 
const customerLoginWithSocial = async (req, res) => {
    try {
        customerBasicDetailsModel.findOne({ socialId: req.body.socialId, socialMediaType: req.body.socialMediaType }, (error, result) => {
            if (error) {
                res.status(400).send({
                    success: false,
                    error: error.message
                })
            }
            else {
                if (result) {
                    res.status(200).send({
                        success: true,
                        data: result,
                        message: 'You Already logedIn',
                        nextScreen: 'Welcome Screen'
                    })
                } else {

                    const details = new customerBasicDetailsModel({
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
                                error: error.message
                            })
                        }
                        else {
                            res.status(200).send({
                                success: true,
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
            error: error.message
        })
    }
}
  
// total cutomers
const totalUser = async (req, res) => {
  return new Promise((resolve, reject) => {
    if (!req || !res) {
      return reject({ status: 400, message: 'Bad Request' });
    }

    try {
      customerBasicDetailsModel
        .find({})
        .populate({ path: 'language', select: ['name'] })
        .exec((err, results) => {
          if (err) {
            return reject({ status: 500, message: 'Internal Server Error' });
          }

          const data = results.length;
//          const languages = result.language?.name ? result.language?.name : 'Unknown';
          const formattedResults = results.map((result) => ({
            _id: result._id,
            language: result.language?.name ? result.language?.name : 'Unknown',
            fullName: result.fullName,
            mobileNumber: result.mobileNumber,
            otp: result.otp,
            email: result.email,
            socialId: result.socialId,
            socialMediaType: result.socialMediaType,
          }));
          return resolve({
            status: 200,
            data: {
              success: true,
              successCode:200,
              message: 'All cutomers',
              total_riders: data,
              results: formattedResults,
            },
          });
        });
    } catch (error) {
      console.error(error);
      return reject({ success:false,successCode:500, message: 'Internal Server Error' });
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

// delete cutomer 
const deleteCustomer = async(req,res)=>{
  try {
    const _id = req.params._id
    const result = await customerBasicDetailsModel.findByIdAndDelete({_id})
    if(result){
      res.status(200).send({
        success:true,
        successCode:200,
        message:'customer delete successfully',
        nextScreen: "loginScreen",
        data:result
      })
    }
    else{
      res.status(404).send({
        success:false,
        successCode:404,
        message:'cutomer not found with this id'
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


const updateUser = (req, res) => {
  const { fullName, mobileNumber  } = req.body;

  // Get token from header
  const token = req.headers.authorization.split(' ')[1];

  // Decode token to get user ID
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;

  // Check if fullName is valid
  if (!fullName || fullName.trim().length < 2) {
    return res.status(400).send({ message: "Invalid fullName" });
  }

  // Update mobile and fullName in database
  customerBasicDetailsModel
    .findOneAndUpdate(
      { _id: userId },
      { $set: { fullName, mobileNumber  } },
      { new: true }
    )
    .populate({ path: "language", select: ["name"] })
    .then((result) => {
      if (!result) {
        return Promise.reject({ status: 422, message: "Mobile number not found" });
      }
      const { _id, language, mobileNumber : resultMobile, otp, socialId, socialMediaType,email } = result;

      // Generate new JWT with updated mobile and fullName
      const newToken = jwt.sign(
        { userId: _id, mobileNumber : resultMobile, language: language.name, fullName,email },
        "theseissecretkey"
      );

      // Update token in database
      result.token = newToken;
      return result.save().then(() => {
        return Promise.resolve({
          message: "Mobile number and fullName updated successfully",
          nextScreen: "welcome",
          data: { _id, language: language.name, fullName, mobileNumber : resultMobile, email, token: newToken },
        });
      });
    })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      if (error.status) {
        return res.status(error.status).send({ message: error.message });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
};

// const allNearestDrivers = (req, res) => {
//   const { pickupLocation } = req.body;
//   // Query MongoDB for all drivers within a 10km radius of the pickup location
//   driverBasicDetailsMOdel.find({
//     isAvailable: true,
//     Status:"online",
//     currentLocation: {
//       $near: {
//         $geometry: {
//           type: "Point",
//           coordinates: [pickupLocation.longitude, pickupLocation.latitude],
//         },
//         $maxDistance: 5000, // 5km in meters
//       },
//     },
//   })
//   .then((drivers) => {
//     // Calculate the distance and time duration to each driver using geolib
//     const driverDistances = drivers.map((driver) => {
//       const distance = geolib.getDistance(
//         { latitude: pickupLocation.latitude, longitude: pickupLocation.longitude },
//         { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
//       );
//       const distanceInKm = distance / 1000; // Convert meters to kilometers
//       const duration = Math.round((distanceInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
//       return { driverId: driver._id, distance: distanceInKm, duration, status: driver.status ,latitude:driver.currentLocation.coordinates[1],longitude:driver.currentLocation.coordinates[0] ,vehicle:driver.vehicleType};
//     });
//     // Return the list of drivers sorted by distance
//     const nearestDrivers = driverDistances.sort((a, b) => a.distance - b.distance);
//       if(nearestDrivers.length === 0){
//       res.status(404).send({
//         message:"All Availabele Nearest Driver is 0 not available anyb driver ",
//          data:nearestDrivers
//        });
//     }
//     else{
//       console.log(nearestDrivers)
//       res.status(200).send({
//         message:"All Availabele Nearest Driver",
//          data:nearestDrivers
//        });
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   });
// };


const allNearestDrivers = (req, res) => {
  const { pickuplatitude,pickuplongitude } = req.body;
  // Query MongoDB for all drivers within a 10km radius of the pickup location
  driverBasicDetailsMOdel.find({
    status: "available",
    Status:"online",
    currentLocation: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [pickuplongitude, pickuplatitude],
        },
        $maxDistance: 5000, // 5km in meters
      },
    },
  })
  .then((drivers) => {
    // Calculate the distance and time duration to each driver using geolib
    const driverDistances = drivers.map((driver) => {
      const distance = geolib.getDistance(
        { latitude: pickuplatitude, longitude: pickuplongitude },
        { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
      );
      const distanceInKm = distance / 1000; // Convert meters to kilometers
      const duration = Math.round((distanceInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
      return { driverId: driver._id, distance: distanceInKm, duration, status: driver.status ,latitude:driver.currentLocation.coordinates[1],longitude:driver.currentLocation.coordinates[0] };
    });
    // Return the list of drivers sorted by distance
    const nearestDrivers = driverDistances.sort((a, b) => a.distance - b.distance);
      if(nearestDrivers.length === 0){
      res.status(200).send({
        message:"not available any driver in your location ",
         data:nearestDrivers
       });
    }
    else{
      res.status(200).send({
        message:"All Availabele Nearest Driver",
         data:nearestDrivers
       });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });
};

// show fare in customer for pickup to dropp off location

const showFareInCustomer = async (req, res) => {
  try {
    const { pickuplocation, dropofflocation ,distance } = req.body;
    const vehicleFares = {};

    // Fetch the fare rates and base fare for all vehicles
    const vehicles = await VehicleTypeWithFareModel.find({});
    for (const vehicle of vehicles) {
      vehicleFares[vehicle.name] = {
        baseFare: vehicle.baseFare,
        perKmCharge: vehicle.perKmCharge
      };
    }

    // Get the addresses of the pickup location and dropoff location
    // const options = {
    //   provider: 'openstreetmap'
    // };
    // const geocoder = NodeGeocoder(options);
    // const pickupAddress = await geocoder.reverse({ lat: pickuplocation.latitude, lon: pickuplocation.longitude });
    // const dropoffAddress = await geocoder.reverse({ lat: dropofflocation.latitude, lon: dropofflocation.longitude });

    // Calculate the distance and duration between the pickup location and the dropoff location
    // const distanceToDropoff = geolib.getDistance(
    //   { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
    //   { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
    // );
    const distanceInKm = distance
    const durationToDropoff = Math.round((distanceInKm / 30) * 60);  // Assuming an average speed of 30 km/h

    // Calculate the fare for each vehicle type
    const fares = [];
    for (const vehicle of vehicles) {
      const fare = Math.round(vehicle.baseFare + (distanceInKm * vehicle.perKmCharge));
      // const fareRange = `${fare}-${fare + 15}`;
      const vehicleData = {
        vehicleName: vehicle.name,
        vehicleImage: `https://rslsofttech.com:7000/${vehicle.uploadVehicleImage}`,
        fare,
        // fareRange,
        distance: distanceInKm,
        duration: durationToDropoff,
        // pickupLocation: { ...pickuplocation, address: pickupAddress[0].formattedAddress },
        // dropOffLocation: { ...dropofflocation, address: dropoffAddress[0].formattedAddress }
        pickupLocation: pickuplocation,
        dropOffLocation: dropofflocation
      };
      fares.push({ vehicleData });
    }

    res.status(200).json({
      success: true,
      message: 'fare details calculated.',
      // pickupLocatiobAddress: pickupAddress[0].formattedAddress,
      // dropOffLocationAddress: dropoffAddress[0].formattedAddress,
      data: fares
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// riderequest by customer

// const riderequest = async (req, res) => {
//   try {
//     const { customerId, pickuplocation, dropofflocation, vehicleType } = req.body;

//     // Find the vehicle type with the fare rate for the selected vehicle type
//     const vehicleTypeWithFare = await VehicleTypeWithFareModel.findOne({ name: vehicleType });
//     // console.log(vehicleTypeWithFare)
//     if (!vehicleTypeWithFare) {
//       return res.status(400).json({ message: "Invalid vehicle type selected." });
//     }
//     const distanceToDropoff = geolib.getDistance(
//       { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
//       { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
//     );
//     const distanceInKm = distanceToDropoff / 1000;
//     const farerate = vehicleTypeWithFare?.perKmCharge
//     const fare = Math.round(vehicleTypeWithFare?.baseFare + (distanceInKm * farerate));

//     // Find the nearest drivers within a 10 km radius of the pickup location
//     const drivers = await driverBasicDetailsMOdel.find({
//       Status: "online",
//       currentLocation: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [pickuplocation.longitude, pickuplocation.latitude],
//           },
//           $maxDistance: 5000, // 10km in meters
//         },
//       },
//     });
//     console.log(drivers)
//     if (drivers.length === 0) {
//       return res.status(404).json({ message: "No drivers found in the area." });
//     }

//     // Calculate the distance and time duration to each driver using geolib
//     const distanceToDriver = drivers.map((driver) => {
//       const distance = geolib.getDistance(
//         { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
//         { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
//       );
//       const distanceToDriverInKm = distance / 1000; // Convert meters to kilometers
//       const durationToDriver = Math.round((distanceToDriverInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
//       return { driverId: driver._id, distance: distanceToDriverInKm.toFixed(2), durationToDriver, isAvailable: driver.isAvailable, deviceToken: driver.deviceToken };
//     });

//     // Return the list of drivers sorted by distance
//     const nearestDrivers = distanceToDriver.sort((a, b) => a.distance - b.distance);

//     // Save the ride request to the database
//     const scheduledTime = new Date();
//     scheduledTime.setHours(10);
//     scheduledTime.setMinutes(30);
//     scheduledTime.setSeconds(0);
//     // console.log(scheduledTime.getTime())
//     // console.log( nearestDrivers)
//     // console.log( nearestDrivers[0].driverId)
//     const ride = new customerRidesModel({
//       customerId,
//       driverId: null,
//       pickupLocation: pickuplocation.address,
//       pickupLatitude: pickuplocation.latitude,
//       pickupLongitude: pickuplocation.longitude,
//       destinationLocation: dropofflocation.address,
//       destinationLatitude: dropofflocation.latitude,
//       destinationLongitude: dropofflocation.longitude,
//       vehicleType: vehicleType,
//       numberOfPassengers: "3",
//       scheduled: true,
//       scheduledDate: Date.now(),
//       bookedFor: "",
//       fare,
//       distance: distanceInKm,
//       duration: Math.round((distanceInKm / 30) * 60), // Assuming average speed of 30 km/hr, convert km to minutes
//     });
//     const savedRide = await ride.save();
//     const customer = await customerBasicDetailsModel.findById({ _id: savedRide.customerId })
//       .populate({ path: 'fullName', select: ['customerId'] })
//     console.log(customer)

//     // Send the ride request to all nearest drivers
//     const messageBody = {
//       ride_id: savedRide._id,
//       customerName: customer.fullName,
//       savedRide,
//     };
//     console.log(messageBody);
    
//     const responses = [];
//     let rideData = {
//       ride_id: savedRide._id,
//       customer_id: customer._id,
//       pickupLocation: savedRide.pickupLocation,
//       pickupLatitude: savedRide.pickupLatitude,
//       pickupLongitude: savedRide.pickupLongitude,
//       destinationLocation: savedRide.destinationLocation,
//       destinationLatitude: savedRide.destinationLatitude,
//       destinationLongitude: savedRide.destinationLongitude,
//       fare,
//       numberOfPassengers:savedRide.numberOfPassengers,
//       status:savedRide.status,
//     };
    
//     for (let i = 0; i < nearestDrivers.length; i++) {
//       const message = {
//         to: 'eWdC1g0hSvK4j43NKVObG1:APA91bFqGeOSgkNIhbEjjRt2CvH1APUJKk9iY02KsS4ace5WVgf-ze1D4E6qARgV_PIJonoandmhi4_NDNc13kmFJJB6WVh9BkTJvMjlF1TJ-1BuXR-Z3x9bPL49yZZd76F8voGaW7qu',
//         notification: {
//           title: 'test',
//           body: `new ride request by ${customer.fullName}`,
//           data:rideData,
//           delivery_receipt_requested: true,
//         },
//       };
    
//       fcm.send(message, function (err, resp) {
//         if (err) {
//           console.log('Error sending message:', err);
//           responses.push({
//             message: 'Error sending message:',
//             err,
//           });
//         } else {
//           console.log('Successfully sent message:', resp);
//           responses.push({
//             message: 'Successfully sent message:',
//             resp,
//           });
//         }
//         if (responses.length === nearestDrivers.length) {
//           res.status(200).json({
//             message: 'Ride request sent to nearest drivers.',
//             ride: rideData,
//           });
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error.', error });
//   }
// };


// const riderequest = async (req, res) => {
//   try {
//     const { customerId, pickuplocation, dropofflocation, vehicleType , distance } = req.body;

//     // Find the vehicle type with the fare rate for the selected vehicle type
//     const vehicleTypeWithFare = await VehicleTypeWithFareModel.findOne({ name: vehicleType });
//     // console.log(vehicleTypeWithFare)
//     if (!vehicleTypeWithFare) {
//       return res.status(400).json({ message: "Invalid vehicle type selected." });
//     }
//     // const distanceToDropoff = geolib.getDistance(
//     //   { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
//     //   { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
//     // );
//     const distanceInKm = distance
//     const farerate = vehicleTypeWithFare?.perKmCharge
//     const fare = Math.round(vehicleTypeWithFare?.baseFare + (distanceInKm * farerate));
// console.log(fare)
//     // Find the nearest drivers within a 10 km radius of the pickup location
//     const drivers = await driverBasicDetailsMOdel.find({
//       Status: "online",
//       currentLocation: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [pickuplocation.longitude, pickuplocation.latitude],
//           },
//           $maxDistance: 5000, // 10km in meters
//         },
//       },
//     });
//     console.log(drivers)
//     if (drivers.length === 0) {
//       return res.status(404).json({ message: "No drivers found in the area." });
//     }

//     // Calculate the distance and time duration to each driver using geolib
//     const distanceToDriver = drivers.map((driver) => {
//       const distance = geolib.getDistance(
//         { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
//         { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
//       );
//       const distanceToDriverInKm = distance / 1000; // Convert meters to kilometers
//       const durationToDriver = Math.round((distanceToDriverInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
//       return { driverId: driver._id, distance: distanceToDriverInKm.toFixed(2), durationToDriver, isAvailable: driver.isAvailable, deviceToken: driver.deviceToken };
//     });

//     // Return the list of drivers sorted by distance
//     const nearestDrivers = distanceToDriver.sort((a, b) => a.distance - b.distance);

//     // Save the ride request to the database
//     const scheduledTime = new Date();
//     scheduledTime.setHours(10);
//     scheduledTime.setMinutes(30);
//     scheduledTime.setSeconds(0);
//     // console.log(scheduledTime.getTime())
//     // console.log( nearestDrivers)
//     // console.log( nearestDrivers[0].driverId)
//     const ride = new customerRidesModel({
//       customerId,
//       driverId: null,
//       pickupLocation: pickuplocation.address,
//       pickupLatitude: pickuplocation.latitude,
//       pickupLongitude: pickuplocation.longitude,
//       destinationLocation: dropofflocation.address,
//       destinationLatitude: dropofflocation.latitude,
//       destinationLongitude: dropofflocation.longitude,
//       vehicleType: vehicleType,
//       numberOfPassengers: "3",
//       scheduled: true,
//       scheduledDate: Date.now(),
//       bookedFor: "",
//       fare,
//       distance: distanceInKm,
//       duration: Math.round((distanceInKm / 30) * 60), // Assuming average speed of 30 km/hr, convert km to minutes
//     });
//     const savedRide = await ride.save();
//     const customer = await customerBasicDetailsModel.findById({ _id: savedRide.customerId })
//       .populate({ path: 'fullName', select: ['customerId'] })
//     console.log(customer)

//     // Send the ride request to all nearest drivers
//     const messageBody = {
//       ride_id: savedRide._id,
//       customerName: customer.fullName,
//       savedRide,
//     };
//     console.log(messageBody);

//     const responses = [];
//     let rideData = {
//       ride_id: savedRide._id,
//       customer_id: customer._id,
//       pickupLocation: savedRide.pickupLocation,
//       pickupLatitude: savedRide.pickupLatitude,
//       pickupLongitude: savedRide.pickupLongitude,
//       destinationLocation: savedRide.destinationLocation,
//       destinationLatitude: savedRide.destinationLatitude,
//       destinationLongitude: savedRide.destinationLongitude,
//       fare,
//       numberOfPassengers: savedRide.numberOfPassengers,
//       status: savedRide.status,
//     };

//     for (let i = 0; i < nearestDrivers.length; i++) {
//       const message = {
//         to: 'eWdC1g0hSvK4j43NKVObG1:APA91bFqGeOSgkNIhbEjjRt2CvH1APUJKk9iY02KsS4ace5WVgf-ze1D4E6qARgV_PIJonoandmhi4_NDNc13kmFJJB6WVh9BkTJvMjlF1TJ-1BuXR-Z3x9bPL49yZZd76F8voGaW7qu',
//         notification: {
//           title: 'test',
//           body: `new ride request by ${customer.fullName}`,
//           data: rideData,
//           delivery_receipt_requested: true,
//         },
//       };

//       fcm.send(message, function (err, resp) {
//         if (err) {
//           console.log('Error sending message:', err);
//           responses.push({
//             message: 'Error sending message:',
//             err,
//           });
//         } else {
//           console.log('Successfully sent message:', resp);
//           responses.push({
//             message: 'Successfully sent message:',
//             resp,
//           });
//         }
//         if (responses.length === nearestDrivers.length) {
//           res.status(200).json({
//             message: 'Ride request sent to nearest drivers.',
//             ride: rideData,
//           });
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error.', error });
//   }
// };

// const riderequest = async (req, res) => {
//   try {
//     const { customerId, pickuplat,pickuplong,pickupadd, dropofflat, dropofflong,dropoffadd, vehicleType, distance } = req.body;

//     // Find the vehicle type with the fare rate for the selected vehicle type
//     const vehicleTypeWithFare = await VehicleTypeWithFareModel.findOne({ name: vehicleType });
//     // console.log(vehicleTypeWithFare)
//     if (!vehicleTypeWithFare) {
//       return res.status(400).json({ message: "Invalid vehicle type selected." });
//     }
//     // const distanceToDropoff = geolib.getDistance(
//     //   { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
//     //   { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
//     // );
//     const distanceInKm = distance
//     const farerate = vehicleTypeWithFare?.perKmCharge
//     const fare = Math.round(vehicleTypeWithFare?.baseFare + (distanceInKm * farerate));
//     console.log(fare)
//     // Find the nearest drivers within a 10 km radius of the pickup location
//     const drivers = await driverBasicDetailsMOdel.find({
//       Status: "online",
//       currentLocation: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [pickuplong, pickuplat],
//           },
//           $maxDistance: 5000, // 10km in meters
//         },
//       },
//     });
//     console.log(drivers)
//     if (drivers.length === 0) {
//       return res.status(404).json({ message: "No drivers found in the area." });
//     }

//     // Calculate the distance and time duration to each driver using geolib
//     const distanceToDriver = drivers.map((driver) => {
//       const distance = geolib.getDistance(
//         { latitude: pickuplat, longitude: pickuplong },
//         { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
//       );
//       const distanceToDriverInKm = distance / 1000; // Convert meters to kilometers
//       const durationToDriver = Math.round((distanceToDriverInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
//       return { driverId: driver._id, distance: distanceToDriverInKm.toFixed(2), durationToDriver, isAvailable: driver.isAvailable, deviceToken: driver.deviceToken };
//     });

//     // Return the list of drivers sorted by distance
//     const nearestDrivers = distanceToDriver.sort((a, b) => a.distance - b.distance);

//     // Save the ride request to the database
//     const scheduledTime = new Date();
//     scheduledTime.setHours(10);
//     scheduledTime.setMinutes(30);
//     scheduledTime.setSeconds(0);
//     // console.log(scheduledTime.getTime())
//     // console.log( nearestDrivers)
//     // console.log( nearestDrivers[0].driverId)
//     const ride = new customerRidesModel({
//       customerId,
//       driverId: null,
//       pickupLocation: pickupadd,
//       pickupLatitude: pickuplat,
//       pickupLongitude: pickuplong,
//       destinationLocation: dropoffadd,
//       destinationLatitude: dropofflat,
//       destinationLongitude: dropofflong,
//       vehicleType: vehicleType,
//       numberOfPassengers: "3",
//       scheduled: true,
//       scheduledDate: Date.now(),
//       bookedFor: "",
//       fare,
//       distance: distanceInKm,
//       duration: Math.round((distanceInKm / 30) * 60), // Assuming average speed of 30 km/hr, convert km to minutes
//     });
//     const savedRide = await ride.save();
//     const customer = await customerBasicDetailsModel.findById({ _id: savedRide.customerId })
//       .populate({ path: 'fullName', select: ['customerId'] })
//     console.log(customer)

//     // Send the ride request to all nearest drivers
//     const messageBody = {
//       ride_id: savedRide._id,
//       customerName: customer.fullName,
//       savedRide,
//     };
//     console.log(messageBody);

//     const responses = [];
//     let rideData = {
//       ride_id: savedRide._id,
//       customer_id: customer._id,
//       pickupLocation: savedRide.pickupLocation,
//       pickupLatitude: savedRide.pickupLatitude,
//       pickupLongitude: savedRide.pickupLongitude,
//       destinationLocation: savedRide.destinationLocation,
//       destinationLatitude: savedRide.destinationLatitude,
//       destinationLongitude: savedRide.destinationLongitude,
//       fare,
//       numberOfPassengers: savedRide.numberOfPassengers,
//       status: savedRide.status,
//     };


//     const driverAccepted = await new Promise((resolve, reject) => {
//       let driverAccepted = false;
//       let retries = 0;
//       const startTime = Date.now();
//       const checkRideStatus = async () => {
//         const acceptedRide = await customerRidesModel.findOne({ _id: savedRide._id, status: 'Accepted' }).exec();
//         if (acceptedRide && acceptedRide.driverId) {
//           const driver = await driverBasicDetailsMOdel.findOne({ _id: acceptedRide.driverId }).exec();
//           if (driver) {
//             const driverDetails = {
//               name:driver.drivingLicence.fullName,
//               mobilenumber: driver.mobileNumber,
//               // vehicletype: driver.vehicleType,
//               // pickupLocation: acceptedRide.pickupLocation,
//               // pickupLatitude: acceptedRide.pickupLatitude,
//               // pickupLongitude: acceptedRide.pickupLongitude,
//               // destinationLocation: acceptedRide.destinationLocation,
//               // destinationLatitude: acceptedRide.destinationLatitude,
//               // destinationLongitude: acceptedRide.destinationLongitude,
//               fare: acceptedRide.fare,
//               confirmOTP: acceptedRide.confirmOTP
//             };
//             resolve(driverDetails); // Resolve with the ride details
//             return;
//           }
//         }
    
//         if (Date.now() - startTime > 90000) { // check if 20 seconds have passed
//           resolve(false); // Resolve with false if no driver accepted the ride
//           return;
//         } else { // call the function again after 2 seconds
//           setTimeout(checkRideStatus, 2000);
//         }
//       };
    
//       const sendFCM = async (driver) => {
//         const message = {
//           to: "dSiJwkR3THqeYrXsGHtGZu:APA91bG9pj9IigaH-r3Kro-OqBJOVmd34kowuErLptMk6Pe9hqLXWIzkE2eN3mb-AxDTb6DXYsl_RvOp3F35Vd41MayzHyDFREl--folwcymvq0_U4JBsrK1vCuSYNX5UErVlBrZ9mDJ",
//            collapse_key: '',
//           notification: {
//             title: 'test',
//             body: `new ride request by ${customer.fullName}`,
//             data: rideData,
//             delivery_receipt_requested: true,
//           },
//         };
    
//         fcm.send(message, async (err, resp) => {
//           if (err) {
//             console.log(`Error sending message to ${driver.mobilenumber}:`, err);
//             // You can push the error message to an array or log it for debugging
//           } else {
//             if (resp) {
//               console.log(`Message sent to ${driver.mobilenumber}:`, resp)
//               driverAccepted = true;
//             }
//           }
//         });
//       };
    
//       nearestDrivers.forEach(async (driver) => {
//         await sendFCM(driver);
//       });
    
//       checkRideStatus();
//     });
    
//     // Send the response to the client
//     if (driverAccepted) {
//       res.status(200).send({
//         message: `${driverAccepted.mobilenumber} has accepted your ride`,
//         data: driverAccepted
//       });
//     } else {
//       res.status(404).send({
//         message: "No driver found within the given radius"
//       });
//     }
    



//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error.', error });
//   }
// };


const riderequest = async (req, res) => {
  try {
    const { customerId, pickuplat, pickuplong, pickupadd, dropofflat, dropofflong, dropoffadd, vehicleType, distance , fcmToken } = req.body;

    // Find the vehicle type with the fare rate for the selected vehicle type
    const vehicleTypeWithFare = await VehicleTypeWithFareModel.findOne({ name: vehicleType });
    // console.log(vehicleTypeWithFare)
    if (!vehicleTypeWithFare) {
      return res.status(400).json({ message: "Invalid vehicle type selected." });
    }
    // const distanceToDropoff = geolib.getDistance(
    //   { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
    //   { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
    // );
    const distanceInKm = distance
    const farerate = vehicleTypeWithFare?.perKmCharge
    const fare = Math.round(vehicleTypeWithFare?.baseFare + (distanceInKm * farerate));
    console.log(fare)
    // Find the nearest drivers within a 10 km radius of the pickup location
    const drivers = await driverBasicDetailsMOdel.find({
      Status: "online",
      currentLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [pickuplong, pickuplat],
          },
          $maxDistance: 5000, // 10km in meters
        },
      },
    });
    console.log(drivers)
    if (drivers.length === 0) {
      return res.status(404).json({ message: "No drivers found in the area." });
    }

    // Calculate the distance and time duration to each driver using geolib
    const distanceToDriver = drivers.map((driver) => {
      const distance = geolib.getDistance(
        { latitude: pickuplat, longitude: pickuplong },
        { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
      );
      const distanceToDriverInKm = distance / 1000; // Convert meters to kilometers
      const durationToDriver = Math.round((distanceToDriverInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
      return { driverId: driver._id, distance: distanceToDriverInKm.toFixed(2), durationToDriver, isAvailable: driver.isAvailable, deviceToken: driver.deviceToken };
    });

    // Return the list of drivers sorted by distance
    const nearestDrivers = distanceToDriver.sort((a, b) => a.distance - b.distance);

    // Save the ride request to the database
    const scheduledTime = new Date();
    scheduledTime.setHours(10);
    scheduledTime.setMinutes(30);
    scheduledTime.setSeconds(0);
    // console.log(scheduledTime.getTime())
    // console.log( nearestDrivers)
    // console.log( nearestDrivers[0].driverId)
    const ride = new customerRidesModel({
      customerId,
      driverId: null,
      pickupLocation: pickupadd,
      pickupLatitude: pickuplat,
      pickupLongitude: pickuplong,
      destinationLocation: dropoffadd,
      destinationLatitude: dropofflat,
      destinationLongitude: dropofflong,
      vehicleType: vehicleType,
      numberOfPassengers: "3",
      scheduled: true,
      scheduledDate: Date.now(),
      bookedFor: "",
      fare,
      distance: distanceInKm,
      duration: Math.round((distanceInKm / 30) * 60), // Assuming average speed of 30 km/hr, convert km to minutes
    });
    const savedRide = await ride.save();
    const customer = await customerBasicDetailsModel.findById({ _id: savedRide.customerId })
      .populate({ path: 'fullName', select: ['customerId'] })
    console.log(customer)

    // Send the ride request to all nearest drivers
    const messageBody = {
      ride_id: savedRide._id,
      customerName: customer.fullName,
      savedRide,
    };
    // console.log(messageBody);

    const responses = [];
    let rideData = {
      ride_id: savedRide._id,
      customer_id: customer._id,
      pickupLocation: savedRide.pickupLocation,
      pickupLatitude: savedRide.pickupLatitude,
      pickupLongitude: savedRide.pickupLongitude,
      destinationLocation: savedRide.destinationLocation,
      destinationLatitude: savedRide.destinationLatitude,
      destinationLongitude: savedRide.destinationLongitude,
      fare,
      numberOfPassengers: savedRide.numberOfPassengers,
      status: savedRide.status,
    };
    const driverAccepted = await new Promise((resolve, reject) => {
      let driverAccepted = false;
      let retries = 0;
      const startTime = Date.now();
      const checkRideStatus = async () => {
        const acceptedRide = await customerRidesModel.findOne({ _id: savedRide._id, status: 'Accepted' }).exec();
        if (acceptedRide && acceptedRide.driverId) {
          const driver = await driverBasicDetailsMOdel.findOne({ _id: acceptedRide.driverId }).exec();
          if (driver) {
             const driverDetails = {
              driverId:acceptedRide.driverId,
              name: driver.drivingLicence.fullName,
              mobilenumber: driver.mobileNumber,
              fare: acceptedRide.fare,
              confirmOtp: acceptedRide.confirmOtp,
              rideStatus:acceptedRide.status
            };
            resolve(driverDetails); // Resolve with the ride details
            return;
          }
        }

        if (Date.now() - startTime > 90000) { // check if 20 seconds have passed
          resolve(false); // Resolve with false if no driver accepted the ride
          return;
        } else { // call the function again after 2 seconds
          setTimeout(checkRideStatus, 2000);
        }
      };
      const sendFCM = async (driver) => {
//         const deviceToken = "eaDX6OsvSKyVCVxLOps6tO:APA91bG2Nutdj8P-3IbQriQ_33GSiQ3dVWVMs_uWxkn58gR0vnYbHAk-t_bpgmMOcVkNe3PYfvzZwXcj1Jvxe6_AaJzbBDYGB2HnAkRDJAUOWR4KnYX3sv_noE7xQpL8RZ4TEHSVB0kq";
        const deviceToken = fcmToken;
        const message = {
          notification: {
            title: 'New Ride Request',
            body: `A new ride request is available ${customer.fullName.toString()}`,
          },
          data: {
            ride_id: rideData.ride_id.toString(),
            customer_id: rideData.customer_id.toString(),
            pickupLocation: rideData.pickupLocation.toString(),
            pickupLatitude: rideData.pickupLatitude.toString(),
            pickupLongitude: rideData.pickupLongitude.toString(),
            destinationLocation: rideData.destinationLocation.toString(),
            destinationLatitude: rideData.destinationLatitude.toString(),
            destinationLongitude: rideData.destinationLongitude.toString(),
            fare: rideData.fare.toString(),
            numberOfPassengers: rideData.numberOfPassengers.toString(),
            status: rideData.status.toString(),
          },
        };
        try {
          const response = await app1Messaging.sendToDevice(deviceToken, message);
          console.log(`Message sent to ${driver.mobilenumber}:`, response)
          driverAccepted = true;

        } catch (error) {
          console.error('Error sending FCM message:', error);
          console.log(`Error sending message to ${driver.mobilenumber}:`, error);
        }
      }
      nearestDrivers.forEach(async (driver) => {
        await sendFCM(driver);
      });

      checkRideStatus();
    });

    // Send the response to the client
    if (driverAccepted) {
      res.status(200).send({
        message: `${driverAccepted.mobilenumber} has accepted your ride`,
        data: driverAccepted
      });
    } else {
      res.status(404).send({
        message: "No driver found within the given radius"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error.', error });
  }
};


// const showFareInCustomer = async (req, res) => {
//   try {
//     const { pickuplocation, dropofflocation } = req.body;
//     const vehicleFares = {};

//     // Fetch the fare rates and base fare for all vehicles
//     const vehicles = await VehicleTypeWithFareModel.find({});
//     for (const vehicle of vehicles) {
//       vehicleFares[vehicle.name] = {
//         baseFare: vehicle.baseFare,
//         perKmCharge: vehicle.perKmCharge
//       };
//     }

//     // Calculate the distance and duration between the pickup location and the dropoff location
//     const distanceToDropoff = geolib.getDistance(
//       { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
//       { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
//     );
//     const distanceInKm = distanceToDropoff / 1000;
//     const durationToDropoff = Math.round((distanceInKm / 30) * 60);  // Assuming an average speed of 30 km/h

//     // Calculate the fare for each vehicle type
//     const fares = [];
//     for (const vehicle of vehicles) {
//       const fare = Math.round(vehicle.baseFare + (distanceInKm * vehicle.perKmCharge));
//       const fareRange = `${fare}-${fare + 15}`;
//       const vehicleData = {
//         vehicleName: vehicle.name,
//         vehicleImage: `https://rslsofttech.com:7000/${vehicle.uploadVehicleImage}`,
//         fare,
//         fareRange,
//         distance: distanceInKm,
//         duration: durationToDropoff,
//         pickupLocation: pickuplocation,
//         dropOffLocation: dropofflocation
//       };
//       fares.push({ vehicleData });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'fare details calculated.',
//       data: fares
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// all rides by customer
const allRidesByCustomer = async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization.split(' ')[1];

    // Decode token to get customer ID
    const decodedToken = jwt.decode(token);
    const customerId = decodedToken.userId;

    // Find all rides of the customer
    const rides = await customerRidesModel.find({ customerId });

    if (rides.length === 0) {
      return res.status(404).json({ message: "No rides found for the customer" });
    }

    const details = await Promise.all(rides.map(async (ride) => {
      // Find driver details of each ride
      const driver = await driverBasicDetailsMOdel.findById(ride.driverId);

      return {
        paymentStatus: ride.paymentStatus,
        rideStartTime: ride.rideStartTime,
        rideEndTime: ride.rideEndTime,
        confirmOtp: ride.confirmOtp,
        _id: ride._id,
        customerId: ride.customerId,
        driverId: ride.driverId,
        driverName: driver ? (driver.drivingLicence ? driver.drivingLicence.fullName : null) : null,
        pickupLocation: ride.pickupLocation,
        pickupLatitude: ride.pickupLatitude,
        pickupLongitude: ride.pickupLongitude,
        destinationLocation: ride.destinationLocation,
        destinationLatitude: ride.destinationLatitude,
        destinationLongitude: ride.destinationLongitude,
        distance: ride.distance,
        fare: ride.fare,
        vehicleType: ride.vehicleType,
        numberOfPassengers: ride.numberOfPassengers,
        scheduled: ride.scheduled,
        scheduledDate: ride.scheduledDate,
        bookedFor: ride.bookedFor,
        status: ride.status,
        createdAt: ride.createdAt,
        updatedAt: ride.updatedAt,
        __v: ride.__v
      };
    }));

    res.status(200).json({
      message: "All rides by customer",
      count: details.length,
      data: details
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

//customer Logout
const customerLogout = (req, res) => {

  const token = req.headers.authorization.split(' ')[1];

  // Decode token to get Mobile Number 
  const decodedToken = jwt.decode(token);
  const _id = decodedToken.userId;

  customerBasicDetailsModel.findOneAndUpdate(
    { _id },
    { $set: { token: null } },
    { new: true }
  )
  .then((result) => {
    if (!result) {
      return Promise.reject({ status: 422, message: "Mobile number not found" });
    }

    return Promise.resolve({
      message: "User logged out successfully",
      nextScreen: "loginScreeen",
      data: { mobileNumber: result.mobileNumber },
    });
  })
  .then((data) => {
    return res.status(200).send(data);
  })
  .catch((error) => {
    console.error(error);
    if (error.status) {
      return res.status(error.status).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  });
};

// customer to driver rating
const customerrRatting = async (req, res) => {
  try {
    const { rideId, customerId, customerRating } = req.body;
    
    // Find the ride associated with the given ride ID
    const foundRide = await customerRidesModel.findById(rideId);
    
    // If the ride is not found, return 404 error
    if (!foundRide) {
      return res.status(404).send({
        success: false,
        message: "Ride not found"
      });
    }
    // If the ride is not completed yet, return 400 error
    else if (foundRide.status !== "Completed") {
      return res.status(400).send({
        success: false,
        message: "This ride has not been completed yet"
      });
    }
    // If the customer ID does not match the ID of the customer assigned to the ride, return 400 error
    else if (foundRide.customerId.toString() !== customerId) {
      return res.status(400).send({
        success: false,
        message: "This customer was not assigned to this driver"
      });
    }
    // If everything checks out, update the rating information in the database
    else {
      const ratingDetails = await ratingModel.findOne({ rideId: rideId });
      
      // If a rating for this ride does not exist, create a new rating object and save it to the database
      if (!ratingDetails) {
        const rating = new ratingModel({
          customerId: foundRide.customerId,
          driverId: foundRide.driverId,
          ride: rideId,
          customerRating: customerRating,
          driverRating: null
        });
        const ratingResult = await rating.save();
        
        // If the rating is successfully saved to the database, return a success message
        if (ratingResult) {
          res.status(200).send({
            success: true,
            message: "Rating submitted successfully"
          });
        } 
        // If the rating fails to save to the database, return an error message
        else {
          res.status(400).send({
            success: false,
            message: "Rating not submitted"
          });
        }
      } 
      // If a rating for this ride already exists, update the existing rating object in the database
      else {
        const updatedRating = await ratingModel.findOneAndUpdate(
          { _id: ratingDetails._id },
          { $set: { customerId: customerId, customerRating: customerRating } },
          { new: true }
        );
        res.status(200).send({
          message: "Thank you for submitting your feedback",
          updatedRating
        });
      }
    }
  } 
  // If there is an error with the request, return a 500 error message
  catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// getDriverCurrentLocation
const getDriverCurrentLocation = async (req, res) => {
  try {
    const driver = await driverBasicDetailsMOdel.findById(req.body._id);
    
    if (!driver) {
      return res.status(404).json({ message: "Driver not found." });
    }

    const { currentLocation: { coordinates } } = driver;
    const [driverlongitude, driverlatitude] = coordinates;

    res.status(200).json({
      success: true,
      successCode: 200,
      message: "Driver location retrieved successfully.",
      data: { driverlatitude, driverlongitude }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error. ${error}` });
  }
}

module.exports = {
  CustmerLogin, otpVerification, customerRegistration, customerLoginWithSocial,totalUser,deleteCustomer,updateUser,
    allNearestDrivers,showFareInCustomer,riderequest, allRidesByCustomer, customerLogout, customerrRatting , getDriverCurrentLocation
}
