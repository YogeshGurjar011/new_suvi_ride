const mongoose = require('mongoose');
const contactUsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model('contactUsModel',contactUsSchema);