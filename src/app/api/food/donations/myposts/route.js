import FoodDonation from '../../../../../models/Post';
import { NextResponse } from 'next/server'; // Assuming next-auth is used for auth

export async function POST(request) {
    
    const reqBody = await request.json();
    const {userId} = reqBody;
  try {
    console.log(userId);
    const myPosts = await FoodDonation.find({ donor: userId });

    return NextResponse.json({ posts: myPosts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 504 });
  }
}
