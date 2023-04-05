const mongoose = require('mongoose');
const rattingSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customerModel'
    },
    driverId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'driverBasicDetailsMOdel'
    },
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customerRidesModel', 
    },
    customerRating:{
        type:Number,
        default:null
    },
    driverRating:{
        type:Number,
        default:null
    }

});
module.exports = mongoose.model('rattingModel',rattingSchema);