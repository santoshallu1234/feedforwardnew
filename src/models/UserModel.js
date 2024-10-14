import mongoose from "mongoose";
import { type } from "os";


mongoose.connect("mongodb://localhost:27017/feedforward");

const userschema = mongoose.Schema({
  username: { 
    type: String, 
    required: [true,"please provide a username"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  useremail :{
    type: String, 
    unique: true  
  },
  dateOfAccountCreated: { 
    type: Date, 
    default: Date.now 
  },
  postIds: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Post' 
    }
  ],
  isVerified: {
     type: Boolean ,
     default:false,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
  forgotPasswordToken : String ,
  forgotPasswordTokenExpiry : Date,
  verifyToken : String ,
  verifyTokenExpiry : Date,
  attendance : {
  type:Boolean,
  default:false,
},
  socketuserid: String,

});



const User = mongoose.models.users || mongoose.model("users",userschema) ;

export default User ;
