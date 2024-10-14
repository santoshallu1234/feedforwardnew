import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect("mongodb://localhost:27017/feedforward");
       const connection = mongoose.connection;
       //event listeners fromvided my mongoose
       connection.on('connected',()=>{
        console.log('mongo connected');
       })
    }
    catch(error){
        console.log("something went wrong in connecting to db");
        console.log(error);
    }
}