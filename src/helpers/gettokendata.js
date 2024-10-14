import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { Console } from "console";



export const getDataFromToken = (request) =>{
    
       const token = request.cookies.get("token");
       const decodedtoken = jwt.verify(token.value,process.env.TOKEN_SECRECT);
       console.log(decodedtoken)
       return decodedtoken.id 

   
    
}