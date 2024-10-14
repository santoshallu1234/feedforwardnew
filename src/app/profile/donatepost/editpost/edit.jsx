"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditPost({ params , postId }) {
 
  //const { postId } = params.postId;
  const [formData, setFormData] = useState({
    foodItems: [],
    location: { coordinates: [] },
    pickupAvailable: false,
  });
  const postId = params.postId;
  useEffect(() => {
    if (postId) {
      // Fetch the post data to pre-fill the form
      axios.patch("../../../api/food/donations/editpost",{postId:postId}).then((res) => setFormData(res.data));
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/donations/${postId}`, formData);
      toast.success("Post updated successfully!");
      router.push(`/donations/${postId}/requests`);
    } catch (error) {
      toast.error("Failed to update post.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Add fields for foodItems, location, pickupAvailable */}
        <div className="mb-4">
          <label className="block">Food Items</label>
          <textarea
            value={formData.foodItems.map(item => item.name).join(", ")}
            onChange={(e) => setFormData({ ...formData, foodItems: e.target.value.split(", ") })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Location (Coordinates)</label>
          <input
            type="text"
            value={formData.location.coordinates.join(", ")}
            onChange={(e) => setFormData({ ...formData, location: { coordinates: e.target.value.split(", ") } })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Pickup Available</label>
          <input
            type="checkbox"
            checked={formData.pickupAvailable}
            onChange={(e) => setFormData({ ...formData, pickupAvailable: e.target.checked })}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}
