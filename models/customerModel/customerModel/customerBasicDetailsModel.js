const { string, number } = require('joi');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    language:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'languagesModel',
        required:true   
    },
    fullName:{
        type:String,
        trim:true,
        lowercase:true,
        default:''
    },
    mobileNumber:{
        type: Number,
        required:true
    },
    otp:{
        type:Number,
        //required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        default:"",    
    },
    token:{
        type:String,
    },
     fcmToken:{
        type:String,
        default:""
    },
    rides:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'customerRidesModel'
        }
    ],
    profileImage:{
        type:String,
        default:""
    }
    // socialId:{
    //     type:String,
    //     trim:true,
    // },
    // socialMediaType:{
    //     type:String,
    //     trim:true,
    // },

});


module.exports=mongoose.model('customerModel',customerSchema)
