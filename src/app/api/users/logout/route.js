
import {NextRequest,NextResponse } from 'next/server'


export async function  POST( request){

    try{
      const response = NextResponse.json({
        message:"logout",
        success:true
       })
      response.cookies.set("token","",{
        httpOnly:true,
        expires: new Date(0)
      },)
     
      return response

    }catch(error){
        return NextResponse.json({errors: error.message},{status: 500});

    }
}