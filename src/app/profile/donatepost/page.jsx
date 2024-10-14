// pages/food-donation.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../navbar";
import Home from "../page";

export default function FoodDonation() {
  const router = useRouter();
  const [donor, setDonor] = useState(sessionStorage.proid);
  const [foodItems, setFoodItems] = useState([]);
  const [location, setLocation] = useState({ type: "Point", coordinates: [] });
  const [pickupAvailable, setPickupAvailable] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [data,setdata ]= useState();

  const handleAddFoodItem = () => {
    setFoodItems([...foodItems, { name, quantity, description, imageUrls }]);
    setName("");
    setQuantity("");
    setDescription("");
    setImageUrls([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("../../api/food/post", {
        donor,
        foodItems,
        location,
        //pickupAvailable
      });

      toast.success(response.data.message);
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit food donation");
    }
  };
 

  
  return (
    <>
    <Home/>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-6">
      <h1 className="text-2xl font-bold mb-4">Food Donation Form</h1>
      <form onSubmit={handleSubmit} className="w-80% max-w-lg bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donor">
            Donor ID
          </label>
          <input
            id="donor"
            type="text"
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foodItems">
            Food Items
          </label>
          {foodItems.map((item, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Description:</strong> {item.description}</p>
              {item.imageUrls.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  {item.imageUrls.map((url, idx) => (
                    <img key={idx} src={url} alt="Food item" className="w-16 h-16 object-cover mt-2" />
                  ))}
                </div>
              )}
            </div>
          ))}
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Food Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            id="imageUrls"
            type="text"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value.split(','))}
            placeholder="Image URLs (comma-separated)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <button
            type="button"
            onClick={handleAddFoodItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Food Item
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location (Longitude, Latitude)
          </label>
          <input
            id="longitude"
            type="number"
            value={location.coordinates[0] || ""}
            onChange={(e) => setLocation({
              ...location,
              coordinates: [parseFloat(e.target.value), location.coordinates[1] || 0]
            })}
            placeholder="Longitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
          />
          <input
            id="latitude"
            type="number"
            value={location.coordinates[1] || ""}
            onChange={(e) => setLocation({
              ...location,
              coordinates: [location.coordinates[0] || 0, parseFloat(e.target.value)]
            })}
            placeholder="Latitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pickup Available
          </label>
          <input
            type="checkbox"
            checked={pickupAvailable}
            onChange={() => setPickupAvailable(!pickupAvailable)}
            className="mr-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
}
