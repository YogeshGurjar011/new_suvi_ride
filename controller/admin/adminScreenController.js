const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//********** ADMIN CONTROLLER **********/
const languagesModel = require('../../models/adminModel/adminScreenModel/adminAllLanguagesModel');
const screensModel = require('../../models/adminModel/adminScreenModel/adminScreensModel');
const fieldsModel = require('../../models/adminModel/adminScreenModel/adminFieldsModel');
const vehicleTypeModel = require('../../models/adminModel/adminScreenModel/adminVehicalTypeModel');
const customerRidesModel = require('../../models/ridesModel/ridesModel');
const adminLoginSchema = require('../../models/adminModel/adminScreenModel/adminLogin');
// Add Language
const addLanguages = async (req, res) => {
    try {
        languagesModel.find({ name: req.body.name, code: req.body.code }, (error, result) => {
            if (error) {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    error: error.message
                })
            }
            else if (result.length) {
                res.status(201).send({
                    success: true,
                    successCode: 201,
                    message: 'language is already exits'
                })
            }
            else {
                const language = new languagesModel({
                    name: req.body.name,
                    code: req.body.code,
                    status: req.body.status,
                })
                language.save((error, result) => {
                    if (error) {
                        res.status(400).send({
                            success: false,
                            successCode: 400,
                            error: error.message,

                        })
                    } else {
                        res.status(200).send({
                            success: true,
                            successCode: 200,
                            data: result,
                            message: 'Lanuage Added Successfully'
                        })
                    }
                })
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

// Get All Languages
const getAllLanguages = async (req, res) => {
    try {
        languagesModel.find({}, (error, result) => {
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
                    message: 'All Languages'
                })
            }
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// Get Active languages
const getActiveLanguages = (req, res) => {
    new Promise((resolve, reject) => {
      languagesModel.find({status: 'active'}).exec((error, result) => {
        if (error) {
          reject({
            success: false,
            successCode: 400,
            error: error.message
          });
        } else {
          resolve({
            success: true,
            successCode: 200,
            data: result,
            message: 'All Languages'
          });
        }
      });
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        successCode: 500,
        message: 'Internal Server Error',
        error: error.message
      });
    });
  };


// Get All Language By Id
const languageGetById = async(req,res)=>{
    try {
       await languagesModel.findOne({_id:req.params._id})
        .exec((error, result) => {
            if (error) {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    error: error.message
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    successCode: 200,
                    data: result,
                    message: `Language By Id`
                });
            }
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

// Edit Language
const editLanguage = async (req, res) => {
    try {
        const filter = { _id: req.params._id };
        const update = {
            $set: {
                name: req.body.name,
                code: req.body.code,
                status: req.body.status
            }
        };
        const options = { new: true };
        const result = await languagesModel.findByIdAndUpdate(filter, update, options);
        if (result) {
            res.status(200).send({
                success: true,
                successCode: 200,
                data: result,
                message: 'Language updated successfully'
            })
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Language not found'
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

// Delete Language
// const deleteLanguage = async (req, res) => {
//     try {
//         languagesModel.deleteOne({ _id: req.params.id }, (error, result) => {
//             if (error) {
//                 res.status(400).send({
//                     success: false,
//                     successCode: 400,
//                     error: error.message
//                 })
//             }
//             else {
//                 res.status(200).send({
//                     success: true,
//                     successCode: 200,
//                     data: result,
//                     message: 'Language deleted successfully'
//                 })
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
const deleteLanguage = async(req,res)=>{
    try {
      const _id = req.params._id
      const result = await languagesModel.findByIdAndDelete({_id})
      if(result){
        res.status(200).send({
          success:true,
          successCode:200,
          data:result,
          message:'Language deleted successfully'
        })
      }
      else{
        res.status(404).send({
          success:false,
          successCode:404,
          message:'Language not found with this id'
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


// Add Screen 
const addScreens = async (req, res) => {
    try {
        screensModel.find({ screenName: req.body.screenName, appScreens: req.body.appScreens }, (error, result) => {
            if (error) {
                res.status(400).send({
                    success: false,
                    successCode: 400,
                    error: error.message
                })
            }
            else if (result.length) {
                res.status(201).send({
                    success: true,
                    successCode: 201,
                    message: 'This screen is already exits'
                })
            }
            else {
                const newScreenModel = new screensModel({
                    appScreens: req.body.appScreens,
                    screenName: req.body.screenName,
                    description: req.body.description
                })
                newScreenModel.save((error, result) => {
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
                            message: 'Screen Added successfully'
                        })
                    }
                })
            }
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// Get All Screens
const getAllScreens = async (req, res) => {
    try {
        screensModel.find({ appScreens: req.body.appScreens }, (error, result) => {
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
                    message: 'All Screens'
                })
            }
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// Edit Screens
const editScreens = async (req, res) => {
    try {
        const filter = { _id: req.params._id };
        const update = {
            $set: {
                screenName: req.body.screenName,
                description: req.body.description
            }
        };
        const options = { new: true };
        const result = await screensModel.findByIdAndUpdate(filter, update, options);
        if (result) {
            res.status(200).send({
                success: true,
                successCode: 200,
                data: result,
                message: 'Screen updated successfully'
            })
        }
        else {
            res.status(404).send({
                success: false,
                successCode: 404,
                message: 'Screen not found with this id'
            })
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

//  Add New label Codes
// const addNewLabelCodes = async(req,res)=>{
//     try{
//         const labelcodes = req.body.labels.map((label)=>label.labelCode);
//         userfieldsModel.find({labelCode:{$in:labelcodes}},(error,result)=>{
//             if(error){
//                 res.status(400).send({
//                     success:false,
//                     error:error.message
//                 })
//             }
//             else if(result.length){
//                 res.status(202).send({
//                     success:false,
//                     message:'This label code already exits'
//                 })
//             }
//             else{
//                 const labels = req.body.labels.map((label)=>({
//                     appScreens:label.appScreens,
//                     screenName:label.screenName,
//                     labelCode:label.labelCode,
//                     language : label.language,
//                     labelText:label.labelText,
//                     errorText:label.errorText,
//                     helpText:label.helpText
//                 }))
//                 fieldsModel.insertMany(labels,(err, result) => {
//                     if (err) {
//                       res.status(500).send({ 
//                         success:false,
//                         error:err.message 
//                     });
//                     } else {
//                     res.status(200).send({
//                         success:true,
//                         data:result,
//                         message:'label code added successfully'
//                     });
//                     }
//                 })
//             }
//         })
//     }
//     catch(error){
//         res.status(500).send({
//             success:false,
//             error:error.message
//         })
//     }
// }

const addNewLabelCodes = async (req, res) => {
    const labels = req.body.labels.map((label) => ({
        screenName: label.screenName,
        labelCode: label.labelCode,
        language: label.language,
        appScreens: label.appScreens,
        labelText: label.labelText,
        errorText: label.errorText,
        helpText: label.helpText
    }))
    const labelcodes = req.body.labels.map((label) => ({
        labelCode: label.labelCode,
        appScreens: label.appScreens,
        screenName: label.screenName
    }));
    fieldsModel.find({ $or: labelcodes }).exec((error, result) => {
        if (error) {
            res.status(400).send({
                success: false,
                successCode: 400,
                message: error.message
            })
        }
        else {
            if (result.length) {
                res.status(200).send({
                    success: true,
                    successCode: 200,
                    message: "This label code already exist"
                })
            }
            else {
                fieldsModel.insertMany(labels, (err, result) => {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.status(200).send({
                            success: true,
                            successCode: 200,
                            results: result,
                            message: 'Label code added successfully'
                        })
                    }
                })
            }
        }
    })
}

// Get All Label Codes
const getAllLabelCodes = async (req, res) => {
    try {
        fieldsModel.find({ appScreens: req.params.appScreens, screenName: req.params.screenName })
            .populate({ path: 'screenName', select: ['screenName'] })
            .populate({ path: 'language', select: ['language'] })
            .exec((error, result) => {
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
                        message: `All label codes of ${req.body.screenName}`
                    })
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

// Get All Label Codes
const getAllLabelCodesById = async (req, res) => {
    try {
        fieldsModel.find({ appScreens: req.body.appScreens, screenName: req.params.screenName })
            .populate({ path: 'screenName', select: ['screenName'] })
            .populate({ path: 'language', select: ['language'] })
            .exec((error, result) => {
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
                        message: `All label codes of ${req.body.screenName}`
                    })
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


// Delete Label Codes
const deleteLabelCodes = async (req, res) => {
    try {
        fieldsModel.deleteOne({ _id: req.params.id }, (error, result) => {
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
                    message: 'Label deleted successfully'
                })
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

// Get All App Screens By Language And AppScreen 
// const getAllScreensByLanguage = async(req,res)=>{
//     try {
//         fieldsModel.find({appScreens:req.body.appScreens,language:req.body.language})
//         .populate({path:'screenName',select:['screenName']})
//         .populate({path:'language',select:['language']})
//         .exec((error,result)=>{
//             if(error){
//                 res.status(400).send({
//                     success:false,
//                     error:error.message
//                 })
//             }
//             else if(!result.length){
//                 res.status(404).send({
//                     success:false,
//                     message:'Data Not FOund'
//                 })
//             }
//             else{
//                 res.status(200).send({
//                     success:true,
//                     data:[result],
//                     message:'All Screens With Language'
//                 })
//             }
//         })
//     } catch (error) {
//         res.status(500).send({
//             success:false,
//             error:error.message
//         })
//     }
// }
const getAllScreensByLanguage = async (req, res) => {
    try {
        const screens = await fieldsModel
            .find({ appScreens: req.body.appScreens })
            .exec();

        fieldsModel
            .find({ language: req.body.language, appScreens: req.body.appScreens })
            .populate({ path: 'screenName', select: ['screenName'] })
            .populate({ path: 'language', select: ['language'] })
            .exec((error, details) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        successCode: 400,
                        message: error.message
                    });
                }
                else {
                    const groupedData = details.reduce((acc, obj) => {
                        const screenName = obj.screenName.screenName;
                        if (!acc[screenName]) {
                            acc[screenName] = [];
                        }
                        acc[screenName].push({
                            _id: obj._id,
                            screen_id: obj.screenName.screenName,
                            language_code: obj.language.language,
                            label_text: obj.labelText,
                            help_text: obj.helpText,
                            error_text: obj.errorText,
                            label_code: obj.labelCode
                        });
                        return acc;
                    }, {});

//                     const result = Object.entries(groupedData).map(([screenName, data]) => ({
//                         [screenName]: data
//                     }));

//                     res.status(200).json({
//                         success: true,
//                         successCode: 200,
//                         data: Object.assign({}, ...result),
//                         message: 'All screens by language'
//                     });
                    
                      const result = Object.entries(groupedData).map(([screenName, data]) => ({
                screen_name: screenName,
                doc: data
              }));
              
               res.status(200).json({
                success: true,
                successCode: 200,
                data: result,
                message: 'All screens by language'
              });
                }
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })
    }
};

// Get All Screens Of Customer App
const getAllCustomerScreens = async (req, res) => {
    try {
        screensModel.find({ appScreens: "customerScreens" }, { screenName: 1, description: 1 })
            .exec((error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        successCode: 400,
                        error: error.message
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        successCode: 200,
                        data: result,
                        message: `All Screens Of Customer App`
                    });
                }
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Get All Screens Of Driver App
const getAllDriverScreens = async (req, res) => {
    try {
        screensModel.find({ appScreens: "driverScreens" }, { screenName: 1, description: 1 })
            .exec((error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        successCode: 400,
                        error: error.message
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        successCode: 200,
                        data: result,
                        message: `All Screens Of Driver App`
                    });
                }
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Get Screens Of Customer App By Id
const getCustomerScreensById = async (req, res) => {
    try {
        screensModel.find({_id:req.params._id}, { screenName: 1, description: 1 })
            .exec((error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        successCode: 400,
                        error: error.message
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        successCode: 200,
                        data: result,
                        message: `All Screens Of Customer App`
                    });
                }
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Get Screens Of Driver App By Id
const getDriverScreensById = async (req, res) => {
    try {
        screensModel.find({_id:req.params._id}, { screenName: 1, description: 1 })
            .exec((error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        successCode: 400,
                        error: error.message
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        successCode: 200,
                        data: result,
                        message: `All Screens Of Driver App`
                    });
                }
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


// Add Vehicle Type 
const addVehicleType = async (req, res) => {
    try {
        const {
            name,
            description,
            perKmCharge,
            gateWayFee,
            cancellationFee,
            waitingFeePermin,
            baseFare,
            hourFare,
            farePerMin,
            seats,
            lateNightFare,
            relaxationTimeInTime,
            lateNightStartTime,
            lateNightEndTime,
            status
        } = req.body;
        const vehicleType = new vehicleTypeModel({
            name,
            description,
            perKmCharge,
            gateWayFee,
            cancellationFee,
            waitingFeePermin,
            baseFare,
            hourFare,
            farePerMin,
            seats,
            lateNightFare,
            relaxationTimeInTime,
            lateNightStartTime,
            lateNightEndTime,
            uploadVehicleImage:req.file.filename,
            status
        });
        const result = await vehicleTypeModel.findOne({name});
        if(result){
            res.status(200).send({
                success:false,
                successCode:200,
                message:"Vehicle with this type already exists"
            });
        }
        else{
            const newVehicleType = await vehicleType.save();
            if(newVehicleType){
                res.status(200).send({
                    success:true,
                    successCode:200,
                    message:"New vehicle type added successfully",
                    data:newVehicleType
                });
            }
            else{
                res.status(400).send({
                    success:false,
                    successCode:400,
                    message:'Unable to add new vehicle type'
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get All Vehicle Type 
const getAllvehicleType = async(req,res)=>{
    try {
        const result = await vehicleTypeModel.find({},{uploadVehicleImage:1,name:1,baseFare:1,farePerMin:1,seats:1,createdAt:1,status:1});
        result.forEach((vehicleType) => {
            vehicleType.uploadVehicleImage = `https://rslsofttech.com:7000/${vehicleType.uploadVehicleImage}`;
        });
        if(!result.length){
            res.status(404).send({
                success:false,
                successCode:404,
                message:'Data not found'
            })
        }
        else{
            res.status(200).send({
                success:true,
                successCode:200,
                message:"All vehicle type",
                total_vehicles:result.length,
                data:result
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


// Delete vehicle Type
const deleteVehicalType = async(req,res)=>{
    try {
        const _id = req.params._id
        const result = await vehicleTypeModel.deleteOne({_id});
        if(result){
            res.status(200).send({
                success:true,
                successCode:200,
                message:'Vehical deleted successfully',
                data:result
            })
        }
        else{
            res.status(400).send({
                success:false,
                successCode:400,
                message:'Not able to delete vehical with this id'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            successCode: 500,
            message: "Internal Server Error",
            error: error.message
        }); 
    }
}


// edit vehicle details
const updateVehicleDetails = async (req, res) => {
    try {
      const _id = req.params._id;
      const {
        name,
        description,
        perKmCharge,
        gateWayFee,
        cancellationFee,
        waitingFeePermin,
        baseFare,
        hourFare,
        farePerMin,
        seats,
        lateNightFare,
        relaxationTimeInTime,
        lateNightStartTime,
        lateNightEndTime,
        status
      } = req.body;
      const result = await vehicleTypeModel.updateOne(
        { _id },
        {
          $set: {
            name,
            description,
            perKmCharge,
            gateWayFee,
            cancellationFee,
            waitingFeePermin,
            baseFare,
            hourFare,
            farePerMin,
            seats,
            lateNightFare,
            relaxationTimeInTime,
            lateNightStartTime,
            lateNightEndTime,
            uploadVehicleImage: req.file ? req.file.filename : undefined,
            status
          }
        }
      );
      if (result) {
        res.status(200).send({
          success: true,
          successCode: 200,
          message: "Vehicle type details updated successfully",
          data: result
        });
      } else {
        res.status(404).send({
          success: false,
          successCode: 404,
          message: "Vehicle type not found"
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        successCode: 500,
        message: "Internal Server Error",
        error: error.message
      });
    }
  };

// admin get all rides in dashboard
// const adminGetAllRides = async (req, res) => {
//     try {
//       const rides = await customerRidesModel.find({})
//         .populate({ path: 'customerId', select: 'fullName' })
//         .populate({ path: 'driverId', select: 'drivingLicence.fullName' })
//         .exec();
  
//       if (rides.length === 0) {
//         return res.status(404).json({
//           message: 'No rides available',
//         });
//       }
  
//       const rideDetails = rides.map((ride) => {
//         let statusColor;
//         switch (ride.status) {
//           case 'completed':
//             statusColor = 'green';
//             break;
//           case 'cancelled':
//             statusColor = 'red';
//             break;
//           case 'in_progress':
//             statusColor = 'blue';
//             break;
//           case 'ongoing':
//             statusColor = 'yellow';
//             break;
//           default:
//             statusColor = 'gray';
//             break;
//         }
        
//         return {
//           ride_id: ride._id,
//           rider_name: ride.customerId.fullName,
//           driver_name: ride.driverId.drivingLicence.fullName,
//           pickup_address: `<span style="height: 10px; width: 10px; background-color: green; border-radius: 50%; display: inline-block;"></span> ${ride.pickupLocation}`,
//           dropoff_address: `<span style="height: 10px; width: 10px; background-color: red; border-radius: 50%; display: inline-block;"></span> ${ride.destinationLocation}`,
//           ride_fare: ride.fare,
//            date:ride.scheduledDate,
//           status: `<button style="background-color: ${statusColor};  border-radius:6px ; color:#FFFFFF; fontFamily: Roboto; fontStyle: normal; fontWeight: 500; fontSize: 12px; lineHeight: 14px; width: 100px; height: 30px;">${ride.status}</button>`
//         };
//       });
  
//       return res.status(200).json({
//         message: 'All Rides',
//         data: rideDetails,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         success: false,
//         successCode: 500,
//         message: 'Internal Server Error',
//         error: error.message,
//       });
//     }
//   };

const adminGetAllRides = async (req, res) => {
    try {
      const rides = await customerRidesModel.find({})
        .populate({ path: 'customerId', select: 'fullName' })
        .populate({ path: 'driverId', select: 'drivingLicence.fullName' })
        .exec();
  
      if (rides.length === 0) {
        return res.status(404).json({
          message: 'No rides available',
        });
      }
  
      const rideDetails = rides.map((ride) => {
        let statusColor;
        switch (ride.status) {
          case 'Completed':
            statusColor = 'green';
            break;
          case 'Decline':
            statusColor = 'red';
            break;
          case 'Accepted':
            statusColor = 'blue';
            break;
          case 'Ongoing':
            statusColor = 'yellow';
            break;
          default:
            statusColor = 'gray';
            break;
        }
  
        const riderName = ride.customerId ? ride.customerId.fullName : 'Unknown';
        const driverName = ride.driverId ? ride.driverId.drivingLicence.fullName : 'Unknown';
  
        return {
          ride_id: ride._id,
          rider_name: riderName,
          driver_name: driverName,
          pickup_address: `<span style="height: 10px; width: 10px; background-color: green; border-radius: 50%; display: inline-block;"></span> ${ride.pickupLocation}`,
          dropoff_address: `<span style="height: 10px; width: 10px; background-color: red; border-radius: 50%; display: inline-block;"></span> ${ride.destinationLocation}`,
          ride_fare: ride.fare,
          date: ride.scheduledDate,
          status: `<button style="background-color: ${statusColor};  border-radius:6px ; color:#FFFFFF; fontFamily: Roboto; fontStyle: normal; fontWeight: 500; fontSize: 12px; lineHeight: 14px; width: 100px; height: 30px;">${ride.status}</button>`
        };
      });
  
      return res.status(200).json({
        message: 'All Rides',
        data: rideDetails,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        successCode: 500,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };

// admin get all rides with diffrent status
const adminGetRidesWithStatus = async (req, res) => {
    try {
      const rides = await customerRidesModel.find({})
        .populate({ path: 'customerId', select: 'fullName' })
        .populate({ path: 'driverId', select: 'drivingLicence.fullName' })
        .exec();
  
      if (rides.length === 0) {
        return res.status(404).json({
          message: 'No rides available',
        });
      }
  
      const filteredRides = rides.filter(ride => ["Completed", "Decline", "Ongoing"].includes(ride.status));
  
      const rideDetails = {
        completed_rides: 0,
        decline_rides: 0,
        ongoing_rides: 0
      };
  
      filteredRides.forEach((ride) => {
        switch (ride.status) {
          case 'Completed':
            rideDetails.completed_rides++;
            break;
          case 'Decline':
            rideDetails.decline_rides++;
            break;
          case 'Ongoing':
            rideDetails.ongoing_rides++;
            break;
          default:
            break;
        }
      });
  
      return res.status(200).json({
        message: 'All Rides',
        total_rides:rides.length,
        completed_rides: rideDetails.completed_rides,
        decline_rides: rideDetails.decline_rides,
        ongoing_rides: rideDetails.ongoing_rides
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        successCode: 500,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };



 // get label code
  const adminGetAllScreenDetails = (req, res) => {
    return new Promise((resolve, reject) => {
        fieldsModel
        .find({ screenName: req.params.screenName, appScreens: req.params.appScreens })
        .populate({ path: "screenName", select: ["screenName"] })
        .populate({ path: "language", select: ["name"] })
        .exec((error, result) => {
          if (error) {
            reject({
              error: error,
              message: error.message,
            });
          } else {
            if (!result.length) {
              resolve({
                result: result,
                message: "These screen type details are not available",
              });
            } else {
              const groupedData = result.reduce((acc, obj) => {
                const { labelCode } = obj;
                if (!acc[labelCode]) {
                  acc[labelCode] = { labelCode, data: [] };
                }
                const language = obj.language ? obj.language.name : null;
                acc[labelCode].data.push({
                  _id: obj._id,
                  language,
                  appScreens: obj.appScreens,
                  labelText: obj.labelText,
                });
                return acc;
              }, {});
              const data = Object.values(groupedData);
              resolve({
                success:true,
                successCode:200,
                data: data,
              });
            }
          }
        });
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  };


const adminSignup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if admin already exists
      const existingAdmin = await adminLoginSchema.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({ message: 'Admin already exists',existingAdmin });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate a JWT token
      const token = jwt.sign({ email }, 'adminsecretkey', { expiresIn: '1h' });
  
      const nowIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

      // Get the month name from the current date in IST
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
      // Set the createdAt and rideStartTime fields
    //   const createdAt = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });
      const updatedAt = new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", timeZone: "Asia/Kolkata" });
      const createdAt = new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", timeZone: "Asia/Kolkata" });
      const lastLogin = new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", timeZone: "Asia/Kolkata" });
      
          
      // Create a new admin with token, timestamp, and last login fields
      const newAdmin = new adminLoginSchema({
        username,
        email,
        password: hashedPassword,
        token,
        createdAt: createdAt,
        updatedAt:updatedAt,
        lastLogin:lastLogin
      });
  
      // Save the admin to the database
      await newAdmin.save();
      const adminData = {
        username: newAdmin.username,
        email: newAdmin.email,
        lastLogin: newAdmin.lastLogin,
        createdAt: newAdmin.createdAt,
        updatedAt: newAdmin.updatedAt,
        token:newAdmin.token
      };
      // Return success response with token
      res.status(201).json({ message: 'Admin created successfully',adminData  });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



  const adminLogin = async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
  
      // Find admin by email or username
      const admin = await adminLoginSchema.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
      });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
       // Get the month name from the current date in IST
      const nowIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const lastLogin = new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", timeZone: "Asia/Kolkata" });
  
      // Update last login timestamp
      admin.lastLogin = lastLogin;
      await admin.save();
  
      const adminData = {
        username: admin.username,
        email: admin.email,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
        token: admin.token
      };
      res.json({ message: 'Login successful', adminData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// get customer details by id
const adminGetAllRidesByCustomer = async (req, res) => {
    try {
      const customerId = req.params._id;
  
      // Find all rides of the customer
      const rides = await customerRidesModel.find({ customerId })
      .populate({ path: 'customerId', select: 'fullName' })
      .populate({ path: 'driverId', select: 'drivingLicence.fullName' })
      .exec();
  
      if (rides.length === 0) {
        return res.status(404).json({ message: "No rides found for the customer" });
      }
  
      const details = await Promise.all(rides.map(async (ride) => {
        // Find driver details of each ride
    
        let statusColor;
        switch (ride.status) {
          case 'Completed':
            statusColor = 'green';
            break;
          case 'Ongoing':
            statusColor = 'yellow';
            break;
          case 'Decline':
            statusColor = 'red';
            break;
          case 'requested':
            statusColor = 'blue';
            break;
          default:
            statusColor = 'gray';
            break;
        }
  
        const statusButton = `<button style="background-color: ${statusColor}; border-radius: 6px; color: #FFFFFF; font-family: Roboto; font-style: normal; font-weight: 500; font-size: 12px; line-height: 14px; width: 100px; height: 30px;">${ride.status}</button>`;
  
        return {
          _id: ride._id,
         
          rider_name: ride.customerId ? ride.customerId.fullName : 'Unknown',
          driver_name: ride.driverId ? ride.driverId.drivingLicence.fullName : 'Unknown',
          fare: ride.fare,
          scheduledDate: ride.scheduledDate,
          status: statusButton,
          createdAt: ride.createdAt,
          pickup_address: `<span style="height: 10px; width: 10px; background-color: green; border-radius: 50%; display: inline-block;"></span> ${ride.pickupLocation}`,
          dropoff_address: `<span style="height: 10px; width: 10px; background-color: red; border-radius: 50%; display: inline-block;"></span> ${ride.destinationLocation}`
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

module.exports = {
    addLanguages, getAllLanguages, languageGetById,editLanguage, deleteLanguage,
    addScreens, getAllScreens, editScreens,
    addNewLabelCodes, getAllLabelCodes, deleteLabelCodes,getAllLabelCodesById,
    getAllScreensByLanguage,getAllCustomerScreens,getAllDriverScreens,
    getCustomerScreensById,getDriverScreensById,addVehicleType,getAllvehicleType,deleteVehicalType,updateVehicleDetails,
    adminGetAllRides,
    adminGetAllScreenDetails,
    adminSignup,
    adminLogin,
    getActiveLanguages,
    adminGetRidesWithStatus,
    adminGetAllRidesByCustomer
}
