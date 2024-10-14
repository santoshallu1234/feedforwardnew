
import User from '../../../../models/UserModel'
import {NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { verify } from 'crypto'
import mongoose from "mongoose";


export async function POST (request){
    try{
       const reqBody = await request.json();
       const {token} = reqBody;
       console.log(token);

      const user = await User.findOne({verifyToken: token,verifyTokenExpiry :{$gt: Date.now()}})

      if(!user){
        return NextRequest.json({error: "Invalid token"},{status:400})
      }
      console.log(user);

      user.isVerified = true ;
      user.verifyToken = undefined ;
      user.verifyTokenExpiry = undefined ;
      await user.save() 

      return NextResponse.json({
        message:"email verified success",
      })
    }
    catch(error){
        return NextResponse.json({error: error.message},{status:500})
    }
}