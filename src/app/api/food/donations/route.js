// pages/api/foodDonations/index.js
import FoodDonation from '../../../../models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Fetch all food donation posts from the database
    const donations = await FoodDonation.find().exec();
     console.log
    return NextResponse.json({
      message: 'Food donations fetched successfully',
      data: donations
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
