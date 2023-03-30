const mongoose = require('mongoose');
const fieldsSchema = mongoose.Schema({
    appScreens:{
        type:String,
        enum:{
            values:['customerScreens','driverScreens'],
            message:'Please enter valid screen name'
        }
    },
    screenName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'screensModel',
        required:true
    },
    labelCode:{
        type:String,
        required:true,
    },
    language:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'languagesModel',
        required:true    
    },
    labelText:{
        type:String,
        required:true
    },
    errorText:{
        type:String,
        //required:true
    },
    helpText:{
        type:String,
        //required:true
    }
});

module.exports = mongoose.model('fieldsModel',fieldsSchema);