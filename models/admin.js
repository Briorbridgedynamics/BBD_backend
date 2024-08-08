const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  approval:{
    type:Boolean,
    default:false
  }
});

const adminSchema = mongoose.model("admins", AdminSchema);
module.exports = adminSchema;
