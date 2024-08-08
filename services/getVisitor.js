const  mongoose  = require("mongoose");
const visitorSchema =require("../models/visitor");
const getVisitor = async ()=>{
    const data=await visitorSchema.find();
    // console.log(data);
    return data;
}
module.exports={
    getVisitor
}