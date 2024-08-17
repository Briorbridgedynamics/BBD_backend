const mongoose = require('mongoose');

const VisitorSchema =new mongoose.Schema(
    {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
    },
    business:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:false
    },
    services:{
        type:[String]
    }
}
);

const visitorSchema=mongoose.model('visitors',VisitorSchema);
module.exports=visitorSchema;