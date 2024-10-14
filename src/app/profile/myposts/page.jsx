"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Home from "../page";
export default function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
   const userId ='66e3c44da1f9fdf63f838b0c';
  // Fetch posts created by the logged-in user
  const fetchMyPosts = async () => {
    try {
      const response = await axios.post("../../../api/food/donations/myposts",{userId:userId});
      console.log(response);
      setMyPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load your posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Home/>
    <div className="p-6 h-[80%]">
      
      <h2 className="text-2xl mb-4">My Donation Posts</h2>
      {myPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {myPosts.map((post) => (
            <li key={post._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-lg font-bold">{post.foodItems.map(item => item.name).join(", ")}</h3>
              <p><strong>Location:</strong> {post.location.coordinates.join(", ")}</p>
              <Link href={`/profile/donatepost/${post._id}`} className="text-blue-500">
                View Requests
              </Link>
              <Link href={`/donations/${post._id}`} className="text-yellow-500 ml-4">
                Edit Post
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
