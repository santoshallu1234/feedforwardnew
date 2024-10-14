import Image from "next/image";

export default function abcd() {
    return (
      <>
       <div className="w-[100%] min-h-[100vh] overflow-hidden gap-10 bg-[rgba(0,0,0,0.6)] flex flex-col justify-center p-10 px-15 items-center ">
          <div className="font-sans text-lg uppercase text-white"> vercel features</div>
          <div className="h-60 w-[40%] flex items-center justify-between  bg-black smallsections" >
          <div className="h-[15vh] w-[15vh] rounded-full bg-white "></div>
          <div className="h-[100%] w-[70%] bg-white rounded-lg"></div>
          </div>
          <div className="h-60 w-[40%] flex items-center smallsections2 justify-between relative " >
          <div className="h-[100%] w-[70%] bg-white rounded-lg"></div>
            <div className="h-[15vh] w-[15vh] rounded-full bg-white "></div>
          </div>

          <div className="h-60 w-[40%] flex items-center justify-between  bg-black smallsections" >
          <div className="h-[15vh] w-[15vh] rounded-full bg-white "></div>
          <div className="h-[100%] w-[70%] bg-white rounded-lg"></div>
          </div>

          <div className="h-60 w-[40%] flex items-center smallsections2 justify-between relative " >
          <div className="h-[100%] w-[70%] bg-white rounded-lg"></div>
            <div className="h-[15vh] w-[15vh] rounded-full bg-white "></div>
          </div>
       </div>
      </>
    );
  }