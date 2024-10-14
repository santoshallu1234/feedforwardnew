
import User from '../../../../models/UserModel'
import {NextRequest,NextResponse } from 'next/server'


export async function POST( request){
   try{
     
     const reqBody = await request.json()
     const {email}= reqBody;
     console.log(email) ;  

    const user = await User.findOne({useremail:email});
    if(!user){
        return NextResponse.json({error : "user have registered and will geyt attendance"});
    }
    console.log(user);
    user.attendance = true ;
    await user.save( );
    console.log(user);
    return NextResponse.json({
    message:"user attendance success",
    success : true ,
   })

   }
   catch(error){
    return NextResponse.json({errors: error.message},{status: 500})

   }
}