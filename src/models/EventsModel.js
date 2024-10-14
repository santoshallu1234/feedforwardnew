import { create } from "domain";
import mongoose from "mongoose";
import { type } from "os";


mongoose.connect("mongodb://localhost:27017/feedforward");




const eventschema = mongoose.Schema({
    eventName: { 
      type: String, 
      required: [true,"please provide a username"], 
      unique: true 
    },
    dateOfEventStart: { 
      type: Date, 
      required: true,
    },
    location:{
      type: String,  
    },
    dateOfEventCreate: { 
      type: Date, 
      default: Date.now 
    },
    eventCapacity: { 
        type: Number , 
    },
   
  });
 
  
  const Events = mongoose.models.events || mongoose.model("events",eventschema) ;

  export default Events ;  