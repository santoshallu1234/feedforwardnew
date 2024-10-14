"use client"

import Footer from "../components/footer";
import Abcd from "../components/abcd";
import Image from "next/image";
import Homepage from "../components/home";
import Link from "next/link";
import Midpage from "../components/midpage";
export default function LandingPage() {
  
  const list = [{
    id:"hbh",
    name:"nakjj",
  },{
    id:"hbh3",
    name:"nakjdj",
  }]

  return (
    <div>
     
     <Homepage/>
     <Midpage/>
     <Image
     src={"vercel.svg"}
     className=" object-cover w-auto h-auto"
     height={400}
     width={600}
      />
      {
        list.map((abc)=><h2>{abc.id}</h2>)
      }
     
    <Footer/>
    </div>
  );
}
