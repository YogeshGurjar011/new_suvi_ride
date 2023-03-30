const mongoose = require('mongoose');
const languagesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    code:{
        type:String,
        required:true,
        lowercase:true
    },
    status:{
        type:String,
        enum:{
            values:['active','inactive']
        },
        lowercase:true
    }
});

module.exports = mongoose.model('languagesModel',languagesSchema);