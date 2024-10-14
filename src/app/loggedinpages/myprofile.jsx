"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export default  function ProfilePage({ params }) {
  const router = useRouter();
  const [userData, setUserData] = useState(null); // User data state
  const [loading, setLoading] = useState(true); // Loading state for UX
   console.log(params);
  const getUserDetails = async () => {
    try {
      const response = await axios.post("../../api/loggedinuser",{userId:params.id});
      console.log(response.data.data);
      setUserData(response.data.data);
      console.log(userData);
      setLoading(false); // Disable loading once data is fetched
    } catch (error) {
      toast.error(error.message || "Failed to fetch user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getUserDetails();
    }
    
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("Updated userData:", userData);
    // Log the updated state
    }
  }, [userData]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-6">
      {loading ? (
        <h2 className="text-white text-2xl">Loading...</h2>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl font-semibold text-center mb-6">
            Profile Page
          </h1>
          <h2 className="text-white text-lg mb-4">User ID: {params.id}</h2>

          {userData ? (
            <div className="text-white">
              <p className="mb-4"><strong>Name:</strong> {userData.username}</p>
              <p className="mb-4"><strong>Email:</strong> {userData.useremail}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p className="text-red-400">Failed to load user data.</p>
          )}
          
          <Link href="/" className="block mt-6 text-blue-400 hover:text-blue-300 text-center">
            Go back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
