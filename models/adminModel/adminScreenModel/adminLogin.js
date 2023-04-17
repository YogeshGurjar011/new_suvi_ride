const mongoose = require('mongoose');

// Create a schema for Admins
const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    },
    updatedAt:{
        type:String,
        required:true
    },
    lastLogin:{
        type:String,
        required:true
    }
  });
  
  // Create a model for Admins
  module.exports =  mongoose.model('admin', adminSchema);

