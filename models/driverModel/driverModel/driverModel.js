const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languagesModel',
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10,12}$/.test(v)
            },
            message: 'please enter valid mobile number'
        }
    },
    otp: {
        type: Number
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    deviceToken: {
        type: String,
        default: ""
    },
    drivingLicence: {
        fullName: {
            type: String,
            trime: true,
            lowercase: true,
            default: ""

        },
        address: {
            type: String,
            trime: true,
            lowercase: true,
            default: ""
        },
        gender: {
            type: String,
            default: ""
//             enum: {
//                 values: ['male', 'female', 'other'],
//                 message: 'something went wrong',
//                 default: 'male'
//             },
        },
        licenceNumber: {
            type: String,
            trime: true,
            default: ""
        },
        issuedDate: {
            // type:Date,
            // default:Date.now
            type: String
        },
        validitiy: {
            // type:Date,
            // default:Date.now
            type: String
        },
        uploadImage: {
            type: String,
            default: ""

        },
        verification: {
            type: String,
            default: "failed"
        }
    },
    vehiclesDetails: {
        vehicleModelNumber: {
            type: String,
            default: ""
        },
        registrationID: {
            type: String,
            default: ""
        },
        dateofRegistration: {
            type: Date,
            default: Date.now
        },
        registrationValidity: {
            type: Date,
            default: Date.now
        },
        imageOfRegistrationCard: {
            type: String,
            default: ""
        },
        verification: {
            type: String,
            default: 'failed'
        }
    },
    bankDetails: {
        accountNumber: {
            type: Number,
            default: "123455"
        },
        IFSC: {
            type: String,
            default: "12345"
        },
        verification: {
            type: String,
            default: 'failed'
        }
    },
    selfie: {
        type: String,
        default: ""
    },
    verificationStatus: {
        type: String,
        default: 'failed'
    },
    vehicleType: {
        type: String,
        enum: ['car', 'bike', 'auto'],
        default: "auto"
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            default: []
        }
    },
    lastLocationUpdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    hasRide: {
        type: Boolean,
        default: false
    },
    currentRide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customerRidesModel'
    },
    passengerCapacity: {
        type: Number,
        default: 4
    },
    lastUpdated: {
        type: Date
    },
    Status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'writeToUsModel'
    }],
    token:{
        type:String,
        default:""
    }
})

driverSchema.index({ currentLocation: '2dsphere' })
module.exports = mongoose.model('driverBasicDetailsMOdel', driverSchema);








