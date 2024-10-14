"use client"
import dynamic from "next/dynamic";
import { Routes,Route, Router,IndexRoute } from 'react-router';
// import { Routes, Route } from "react-router-dom";
// import ReactDOM from "react-dom/client";
// import Landingpage from "./Landingpage";
 import Login from "./pages/login";
import Signup from "./pages/signup";
// import Donations from "./loggedinpages/donations";
// import DoantePost from "./loggedinpages/donatepost";
// import MyPost from "./loggedinpages/myposts";
// import ProfileLogin from "./loggedinpages/profilelogin";
// import LandingPage from "./Landingpage";
// import Myprofile from "./loggedinpages/myprofile";
// const BrowserRouter = dynamic(() => import("react-router-dom").then(mod => mod.BrowserRouter), { ssr: false });


{/* <BrowserRouter> 
    <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route  index  path="/" element={<LandingPage/>} />
    <Route  path="/login" element={<Login/>} />
    <Route path="/profile" element={<ProfileLogin/>}/>
    <Route path="/profile/donations" element={<Donations/>} />
    <Route path="/profile/donatepost" element={<DoantePost/>} />
    <Route path="/profile/myposts" element={<MyPost/>} />
    <Route path="/profile/:id" element={<Myprofile/>} />
    </Routes>
   </BrowserRouter> */}
export default function Page() {
  return (
   <>
   </>
  );
}
