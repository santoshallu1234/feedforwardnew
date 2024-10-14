"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "qrcode"

//import QRCode from "react-qr-code";


export default function Home() {
  const router = useRouter()
 const [src,setSrc] = useState('')
const [email,setEmail] = useState('')  
/*
  <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={JSON.stringify({email:'vvbm',name:'bggg'})}
    viewBox={`0 0 256 256`}
  />

 
*/
const generate = async ()=>{
   
 await QRCode.toDataURL(JSON.stringify({email:email})).then(setSrc) ;
 const response = await axios.post("../api/users2/getorcode",{email:email,src:src});
console.log("signup success",response.data);
  
}

    return (
      <main className=" h-[100vh] w-[100%] flex flex-col bg-slate-800 items-center justify-center">
        <h1 className=" text-white">generate qr code</h1>
        <img src={src}></img>
        
      
        <input className="border-8" value={email} type="text" onChange={ async (e) => {setEmail(e.target.value);
           await QRCode.toDataURL(JSON.stringify({email:email})).then(setSrc) ;
        }}></input>
       
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
         
        <button type="button " className="text-white" onClick={generate}>submit</button></div>
      </main>
    );
  }