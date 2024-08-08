const { mongoose } = require("mongoose");
const visitorSchema = require("../models/visitor");


const addVisitor = async (name,email,date,contact,comments="",services=[])=>{
    try{
        const visitor=await visitorSchema.create({
            name:name,
            email:email,
            date:date,
            contact:contact,
            comments:comments,
            services:services
        });
        return (
            {
                status:"Success",
                visitor:visitor
            });
    }
    catch(err){
        console.log(err);
        return(
            {
                status:"Something went Wrong",
                error:err
            }
        );
    }
    
    
}
module.exports={addVisitor}