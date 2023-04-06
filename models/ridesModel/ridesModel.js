// const mongoose = require('mongoose');
// const customerRidesSchema = mongoose.Schema({
//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'customerModel',
//     required: true
//   },
//   driverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'driverBasicDetailsMOdel'
//   },
//   pickupLocation: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true,
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//     },
//   },
//   destinationLocation: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true,
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//     },
//   },
//   distance: {
//     type: Number
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['Cash', 'CreditCard', 'DebitCard', 'online'],
//     //required: true,
//   },
//   numberOfPassengers: {
//     type: Number,
//     default: ""
//   },
//   scheduled: {
//     type: Boolean,
//     // required: true
//   },
//   scheduledDate: {
//     type: Date
//   },
//   scheduledTime: {
//     type: String
//   },
//   bookedFor: {
//     type: String
//   },
//   fare: {
//     type: Number,
//     // required: true
//   },
//   vehicleType: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'vehicleTypeModel'
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Accepted', 'Decline', 'Completed', 'requested', 'Ongoing'],
//     default: 'requested',
//   },
//   ratting: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'rattingModel'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   },
//   rideStartTime: {
//     type: Date,
//     default: null
//   },
//   rideEndTime: {
//     type: Date,
//     default: null
//   }
// });

// customerRidesSchema.index({ pickupLocation: '2dsphere' });
// customerRidesSchema.index({ destinationLocation: '2dsphere' });

// module.exports = mongoose.model('customerRidesModel',customerRidesSchema);

const mongoose = require('mongoose');
const customerRidesSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customerModel',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driverBasicDetailsMOdel'
  },
  pickupLocation: {
    type: String,
    required: true
  },
  pickupLatitude: {
    type: Number,
    required: true
  },
  pickupLongitude: {
    type: Number,
    required: true
  },
  destinationLocation: {
    type: String,
    required: true
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
  paymentMethod: {
    type: String,
    enum: ['Cash', 'CreditCard', 'DebitCard', 'online'],
    //required: true,
  },
  paymentStatus: {
    type: String,
    default: 'Pending'
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'auto', 'rikshaw'],
    required: true
  },
  numberOfPassengers: {
    type: Number,
    default: ""
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
    enum: ['Pending', 'Accepted', 'Decline', 'Completed', 'requested', 'Ongoing'],
    default: 'requested',
  },
  ratting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rattingModel'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  rideStartTime: {
    type: Date,
    default: null
  },
  rideEndTime: {
    type: Date,
    default: null
  }


})

module.exports = mongoose.model('customerRidesModel', customerRidesSchema);
