
import User from '../../../../models/UserModel'
import {NextRequest,NextResponse } from 'next/server'
const { MongoClient, ObjectId } = require('mongodb');
import { getDataFromToken } from '../../../../helpers/gettokendata'

export async function POST(request){
      try{
        const userid = getDataFromToken(request);
        const user = await User.findOne({_id: userid}).select("-password");
        return NextResponse.json({
         message: "USER FOUND",
         data: user ,
        })
    }catch(error){
        return NextResponse.json({errors: error.message},{status: 500});

    }
   
   
}