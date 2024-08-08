const { mongoose } = require("mongoose");
const adminSchema = require("../models/admin");


const addAdmin = async (email,password)=>{
    try{
        const admin=await adminSchema.create({
            email:email,
            password:password
        });
        return (
            {
                status:"Success",
                data:admin
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
module.exports={addAdmin}