const mongoose = require('mongoose');
const customerRidesSchema = mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customerModel',
        required:true
    },
    driverId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'driverBasicDetailsMOdel'
    },
    pickupLocation:{
        type:String,
        required:true
    },
    pickupLatitude: {
        type: Number,
        required: true
      },
    pickupLongitude: {
        type: Number,
        required: true
      },
    destinationLocation:{
        type:String,
        required:true
    },
    destinationLatitude: {
        type: Number,
        required: true
      },
    destinationLongitude: {
        type: Number,
        required: true
      },
    distance: {
        type: Number
    },
    fare: {
      type: Number,
      required: true
    },
    vehicleType: {
      type: String,
      enum: ['car', 'bike', 'auto'],
      required: true
    },
    numberOfPassengers:{
        type:Number,
        default:""
    },
    scheduled: {
        type: Boolean,
        required: true
      },
    scheduledDate: {
        type: Date
      },
    scheduledTime: {
        type: String
      },
    bookedFor: {
        type: String
      },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
      default: 'requested'
   },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    

})

module.exports = mongoose.model('customerRidesModel',customerRidesSchema);