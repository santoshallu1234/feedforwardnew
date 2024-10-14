
import User from '../../../models/UserModel'
import {NextRequest,NextResponse } from 'next/server'
const { MongoClient, ObjectId } = require('mongodb');

export async function POST(request){
      try{
        const reqBody = await request.json()
        const {userId} = reqBody;
        console.log(userId);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
         message: "USER FOUND",
         data: user 
        })
    }catch(error){
        return NextResponse.json({errors: error.message},{status: 500});

    }
   
   
}