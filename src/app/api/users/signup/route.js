
import User from '../../../../models/UserModel'
import {NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '../../../../helpers/mailer'
import { sendEmailQr } from '../../../../helpers/mailqrcode'
//connect()

export async function POST( request){
   try{
     
     const reqBody = await request.json()
     const {username , email,password}= reqBody;
     console.log(username);
     //const user2 = await User.findAll({attendance:false});
    const user = await User.findOne({useremail :email});
    console.log(user);
    //console.log(user2);
    if(user){
        return NextResponse.json({error : "user already exists"});
    }
    
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
   
    // console.log(email)
    const newUser = new User({
        username,
        password: hash,
        useremail : email,
        
    })
   
   const savedUser = await newUser.save();
   //console.log(savedUser);
   //send verification mail

   //await sendEmail({email, emailType:"VERIFY",userId : savedUser._id} )

   return NextResponse.json({
    message:"user registered success",
    success : true ,
    savedUser 
   })

   }
   catch(error){
    return NextResponse.json({errors: error.message},{status: 500})

   }
}