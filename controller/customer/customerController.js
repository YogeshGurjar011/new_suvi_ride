const { required } = require('joi');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const cfSdk = require('cashfree-sdk');
const customerBasicDetailsModel = require('../../models/customerModel/customerModel/customerBasicDetailsModel')
const driverBasicDetailsMOdel = require('../../models/driverModel/driverModel/driverModel');
const VehicleTypeWithFareModel = require('../../models/adminModel/adminScreenModel/adminVehicalTypeModel');
const geolib = require('geolib');
const NodeGeocoder = require('node-geocoder');
const FCM = require('fcm-node');
const serverKey = 'AAAAjBZozHE:APA91bF2n5bBmQToPuoUowPFFWpfPx0PsJEwNjanwmiLR4YWVgSy3T6s9S7yKNQoQHNKUEXgOLE35BNrO2OfthgM02MlRDD6lpaCLJZceqCrW51TPxjFqRV4DEKVz6IJghCxqKl44hGP';
const fcm = new FCM(serverKey);


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
const CustmerLogin = async(req, res) => {
    return new Promise(async (resolve, reject) => {
      if (!req || !res || !req.body || !req.body.mobileNumber || !/^\d{10}$/.test(req.body.mobileNumber)) {
        return reject({ status: 400, message: 'Please provide a valid 10-digit mobile number.' });
      }
  
      try {
        const { language, mobileNumber,fcmToken } = req.body;
  
        const existingUser = await customerBasicDetailsModel.find({ mobileNumber }).exec();
        if (existingUser.length === 0) {
          const newUser = new customerBasicDetailsModel({
            mobileNumber: mobileNumber,
            language: language,
            fcmToken:fcmToken
            // email:"",
            // socialId:"",
            // socialMediaType:""
          });
  
          await newUser.save();
  
          return resolve({
            status: 200,
            data: {
              success: true,
              successCode :200,
              message: 'New User added successfully',
              nextScreen: 'registration',
              data: newUser,
            },
          });
        } else {
          const result = existingUser[0];
          if (result.fullName == '') {
            return resolve({
              status: 200,
              data: {
                success: true,
                successCode:200,
                message:'This user verify its number already',
                nextScreen: 'registration',
                data:result
              },
            });
          } else {
            return resolve({
              status: 200,
              data: {
                success: true,
                successCode:200,
                message: "User already Registred",
                nextScreen: 'permission',
                data: result,
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
        .populate({ path: 'language', select: ['language'] })
        .exec((err, results) => {
          if (err) {
            return reject({ status: 500, message: 'Internal Server Error' });
          }

          const data = results.length;
          const formattedResults = results.map((result) => ({
            _id: result._id,
            language: result.language?.language,
            fullName: result.fullName,
            mobile: result.mobile,
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
        data:result,
        message:'cutomer deleted successfully'
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

const allNearestDrivers = (req, res) => {
  const { pickupLocation } = req.body;
  // Query MongoDB for all drivers within a 10km radius of the pickup location
  driverBasicDetailsMOdel.find({
    isAvailable: true,
    Status:"online",
    currentLocation: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [pickupLocation.longitude, pickupLocation.latitude],
        },
        $maxDistance: 5000, // 5km in meters
      },
    },
  })
  .then((drivers) => {
    // Calculate the distance and time duration to each driver using geolib
    const driverDistances = drivers.map((driver) => {
      const distance = geolib.getDistance(
        { latitude: pickupLocation.latitude, longitude: pickupLocation.longitude },
        { latitude: driver.currentLocation.coordinates[1], longitude: driver.currentLocation.coordinates[0] }
      );
      const distanceInKm = distance / 1000; // Convert meters to kilometers
      const duration = Math.round((distanceInKm / 30) * 60); // Assuming average speed of 30 km/hr, convert km to minutes
      return { driverId: driver._id, distance: distanceInKm, duration, status: driver.status ,latitude:driver.currentLocation.coordinates[1],longitude:driver.currentLocation.coordinates[0] ,vehicle:driver.vehicleType};
    });
    // Return the list of drivers sorted by distance
    const nearestDrivers = driverDistances.sort((a, b) => a.distance - b.distance);
      if(nearestDrivers.length === 0){
      res.status(404).send({
        message:"All Availabele Nearest Driver is 0 not available anyb driver ",
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
    const { pickuplocation, dropofflocation } = req.body;
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
    const options = {
      provider: 'openstreetmap'
    };
    const geocoder = NodeGeocoder(options);
    const pickupAddress = await geocoder.reverse({ lat: pickuplocation.latitude, lon: pickuplocation.longitude });
    const dropoffAddress = await geocoder.reverse({ lat: dropofflocation.latitude, lon: dropofflocation.longitude });

    // Calculate the distance and duration between the pickup location and the dropoff location
    const distanceToDropoff = geolib.getDistance(
      { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
      { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
    );
    const distanceInKm = distanceToDropoff / 1000;
    const durationToDropoff = Math.round((distanceInKm / 30) * 60);  // Assuming an average speed of 30 km/h

    // Calculate the fare for each vehicle type
    const fares = [];
    for (const vehicle of vehicles) {
      const fare = Math.round(vehicle.baseFare + (distanceInKm * vehicle.perKmCharge));
      const fareRange = `${fare}-${fare + 15}`;
      const vehicleData = {
        vehicleName: vehicle.name,
        vehicleImage: `https://rslsofttech.com:7000/${vehicle.uploadVehicleImage}`,
        fare,
        fareRange,
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
      pickupLocatiobAddress: pickupAddress[0].formattedAddress,
      dropOffLocationAddress:dropoffAddress[0].formattedAddress,
      data: fares
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// riderequest by customer

const riderequest = async (req, res) => {
  try {
    const { customerId, pickuplocation, dropofflocation, vehicleType } = req.body;

    // Find the vehicle type with the fare rate for the selected vehicle type
    const vehicleTypeWithFare = await VehicleTypeWithFareModel.findOne({ name: vehicleType });
    // console.log(vehicleTypeWithFare)
    if (!vehicleTypeWithFare) {
      return res.status(400).json({ message: "Invalid vehicle type selected." });
    }
    const distanceToDropoff = geolib.getDistance(
      { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
      { latitude: dropofflocation.latitude, longitude: dropofflocation.longitude }
    );
    const distanceInKm = distanceToDropoff / 1000;
    const farerate = vehicleTypeWithFare?.perKmCharge
    const fare = Math.round(vehicleTypeWithFare?.baseFare + (distanceInKm * farerate));

    // Find the nearest drivers within a 10 km radius of the pickup location
    const drivers = await driverBasicDetailsMOdel.find({
      Status: "online",
      currentLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [pickuplocation.longitude, pickuplocation.latitude],
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
        { latitude: pickuplocation.latitude, longitude: pickuplocation.longitude },
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
      pickupLocation: pickuplocation.address,
      pickupLatitude: pickuplocation.latitude,
      pickupLongitude: pickuplocation.longitude,
      destinationLocation: dropofflocation.address,
      destinationLatitude: dropofflocation.latitude,
      destinationLongitude: dropofflocation.longitude,
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
    console.log(messageBody);
    
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
      numberOfPassengers:savedRide.numberOfPassengers,
      status:savedRide.status,
    };
    
    for (let i = 0; i < nearestDrivers.length; i++) {
      const message = {
        to: 'eWdC1g0hSvK4j43NKVObG1:APA91bFqGeOSgkNIhbEjjRt2CvH1APUJKk9iY02KsS4ace5WVgf-ze1D4E6qARgV_PIJonoandmhi4_NDNc13kmFJJB6WVh9BkTJvMjlF1TJ-1BuXR-Z3x9bPL49yZZd76F8voGaW7qu',
        notification: {
          title: 'test',
          body: `new ride request by ${customer.fullName}`,
          data:rideData,
          delivery_receipt_requested: true,
        },
      };
    
      fcm.send(message, function (err, resp) {
        if (err) {
          console.log('Error sending message:', err);
          responses.push({
            message: 'Error sending message:',
            err,
          });
        } else {
          console.log('Successfully sent message:', resp);
          responses.push({
            message: 'Successfully sent message:',
            resp,
          });
        }
        if (responses.length === nearestDrivers.length) {
          res.status(200).json({
            message: 'Ride request sent to nearest drivers.',
            ride: rideData,
          });
        }
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

module.exports = {
  CustmerLogin, otpVerification, customerRegistration, customerLoginWithSocial,totalUser,deleteCustomer,updateUser,
    allNearestDrivers,showFareInCustomer,riderequest
}
