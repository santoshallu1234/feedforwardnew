
import User from '/src/models/UserModel';
import {NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
//connect()

export async function  POST( request){
   try{
     
     const reqBody = await request.json()
     const { email,password}= reqBody;
     
    const user = await User.findOne({useremail:email});
    if(!user){
        return NextResponse.json({error : "user doesn't exists"},{status:400});
    }
    console.log("user exits");
    
    const valid = await bcryptjs.compare(password,user.password);
    console.log(valid);
    if(!valid){
        return NextResponse.json({error : "incorrect password"},{status:400});
    }
    
    const tokendata = {
        id: user._id ,
        username:user.username,
        email: user.email
    }
    
    var token = jwt.sign(tokendata, process.env.TOKEN_SECRECT,{expiresIn:'1h'});
    const response = NextResponse.json({
        message:"logged in success",
        sucess:true
    })

    response.cookies.set("token",token,{
        httpOnly:true
    })
    return response 

   }
   catch(error){
    return NextResponse.json({errors: error.message},{status: 500})

   }
}