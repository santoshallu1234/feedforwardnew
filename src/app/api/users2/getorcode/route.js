
import User from '/src/models/UserModel'
import {NextRequest,NextResponse } from 'next/server'
import { sendEmailQr } from '../../../../helpers/mailqrcode'
//connect()

export async function POST( request){
   try{
     
     const reqBody = await request.json()
     const {email, src}= reqBody;
    
    console.log(email,src)
    const user = await User.findOne({useremail : email});
    if(!user){
        return NextResponse.json({error : "user not exists"});
    }
   
   
   console.log(user);
   //send verification mail

   await sendEmailQr({email,src} );

   return NextResponse.json({
    message:"email send success",
    success : true ,
    
   })

   }
   catch(error){
    return NextResponse.json({errors: error.message},{status: 500})

   }
}