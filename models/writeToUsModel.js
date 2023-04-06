const mongoose = require('mongoose');
const writeToUsSchema = new mongoose.Schema({
    driverId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'driverBasicDetailsMOdel'
    },
    subject:{
        type:String,
        default:"No complaints"
    },
    emailId:{
        type:String,
        default:""
    },
    describeYourIssue:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model('writeToUsModel',writeToUsSchema);