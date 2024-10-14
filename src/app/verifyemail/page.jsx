"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter ,useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [urltoken,setUrlToken] = useSearchParams('token');
  const [verified,setVerified] = useState(false);

  const [buttonDisabled ,setButtonDisabled] = useState(false)
  const  [loading ,setLoading] = useState(false)
  const verifyEmail = async () =>{
    try{
        setLoading(true)
       const response = await axios.post("../api/users/verifyemail",{token :urltoken[1]})
       console.log("verify success",response.data);
       setVerified(true);
       //router.push('/login')
    }catch (error){
        console.log("email verification failed");
        toast.error(error.response.data)
    }
  }
  
  useEffect(()=>{
  console.log(urltoken[1]);
  },[])


    return (
      <>
          <main className="flex flex-col gap-4 h-[100vh] w-[100%] bg-black items-center justify-center">
        <h1 className="text-white">{loading? "processing" : "verify"}</h1>
        <hr/>
        <p>{buttonDisabled ? "TOKEN NOT CONSIDERED":"considered"}</p>
       <button className="text-white" onClick={verifyEmail}>
        {verified ? "VERIFIED": "VERIFY"}
       </button>
       </main></>
    );
  }

