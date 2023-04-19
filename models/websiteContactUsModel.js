const mongoose = require('mongoose');
const contactUsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    mobileNumber:{
        type:Number
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model('contactUsModel',contactUsSchema);