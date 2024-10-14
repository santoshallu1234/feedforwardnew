"use client"
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {toast} from 'react-hot-toast';
import { useEffect, useState } from "react";
export default function Navbar() {
  const router = useRouter();
  const [data,setdata ]= useState();
  const [loading, setLoading] = useState(false);
  const getUserDetails = async ()=>{
   try{
    const response = await axios.post("../api/aboutme");
    const fildata = response.data.data 
    console.log(fildata);
    dataset = fildata ;
    setdata(fildata._id);
    console.log(dataset);
    
  
   }catch(error){
    toast.error(error.message);
   }
  }

  const logout = async ()=>{
        try{
            await axios.post("../../api/users/logout");
            toast.success("logout success");
            router.push("/login");
        }catch(error){
          toast.error(error.message);
        }
  }


 
  const handleNavigation = (path) => {
    router.push(path);
  };
  useEffect(() =>{
    getUserDetails()
  },[])

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold">Navigation</h1>
      <div className="flex space-x-4">
        {/* Profile Button */}
        <button 
          onClick={() => handleNavigation(`/profile/${data}`)}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          View Profile
        </button>

        {/* View All Donations Button */}
        <button 
          onClick={() => handleNavigation('/profile/donations')}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          View All Donations
        </button>

        {/* Post About Donating Food Button */}
        <button 
          onClick={() => handleNavigation('/profile/donatepost')}
          className="bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Post About Donating Food
        </button>

        {/* Logout Button */}
        <button 
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  );
}
