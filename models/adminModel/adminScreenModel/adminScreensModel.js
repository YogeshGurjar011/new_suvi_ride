const mongoose = require('mongoose');
const screensSchema = mongoose.Schema({
    appScreens:{
        type:String,
        enum:{
            values:['customerScreens','driverScreens'],
            message:'Please enter valid screen name'
        }
    },
    screenName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('screensModel',screensSchema);
