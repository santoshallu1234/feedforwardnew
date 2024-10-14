import Image from "next/image";

export default function abcd() {
    return (
      <>
       <div className="w-[100%] h-60 bg-[rgba(0,0,0,0.3)] flex justify-between p-10 px-15 items-center">
        <div>
        <Image
     src={"vercel.svg"}
     className=" object-cover w-auto h-auto logo"
     height={10}
     width={20}
      /> 
        </div>
        <div className="flex flex-col justify-end" > 
            <p>helloabcd@copyright/2018</p>
        </div>
        <div className="flex">
      
        <h3>hello</h3>
        <hr className="rotate-90 h-1 w-10 bg-black self-center"></hr>
       <h3>logo</h3>
        </div>
       </div>
      </>
    );
  }