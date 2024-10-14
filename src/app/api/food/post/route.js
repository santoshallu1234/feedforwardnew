import FoodDonation from '../../../../models/Post'
import {NextRequest,NextResponse } from 'next/server'
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {donor,foodItems,location} = reqBody;
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(currentDate.getDate() + 2)
  
  /* {
  "donor": "60d5ec49f1c4d7d4f4c915b5", // Replace with a valid User ObjectId
  "foodItems": [
    {
      "name": "Apples",
      "quantity": 15,
      "description": "Freshly picked red apples.",
      "imageUrls": [
        "https://example.com/images/apple1.jpg",
        "https://example.com/images/apple2.jpg"
      ]
    },
    {
      "name": "Bread",
      "quantity": 10,
      "description": "Whole grain bread, freshly baked.",
      "imageUrls": [
        "https://example.com/images/bread.jpg"
      ]
    }
  ],
  "location": {
    "type": "Point",
    "coordinates": [-73.856077, 40.848447] // Longitude, Latitude
  },
  "expirationDate": "2024-10-01T00:00:00Z",
  "pickupAvailable": true
} */
   
    const  NewDonation = new FoodDonation ({
        donor: donor, // Replace with a valid User ObjectId
        foodItems: foodItems,
        location:location,
        expirationDate: expirationDate,
        pickupAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    

      const savedUser = await NewDonation.save();
      console.log(savedUser);

    return NextResponse.json({
      message: "Dummy data inserted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
}
