const mongoose = require('mongoose');

const vehicleTypeSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    perKmCharge: {
        type: Number
    },
    gatewayFee: {
        type: Number
    },
    cancellationFee: {
        type: Number
    },
    waitingFeePerMin: {
        type: Number
    },
    baseFare: {
        type: Number
    },
    hourFare: {
        type: Number
    },
    farePerMin: {
        type: Number
    },
    seats: {
        type: Number
    },
    lateNightFare: {
        type: Number
    },
    relaxationTimeInMins: {
        type: Number
    },
    lateNightStartTime: {
        type: String
    },
    lateNightEndTime: {
        type: String
    },
    uploadVehicleImage: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

module.exports = mongoose.model('vehicleTypeModel', vehicleTypeSchema);
