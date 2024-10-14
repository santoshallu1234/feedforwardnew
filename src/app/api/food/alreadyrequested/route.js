import Request from '../../../../models/Request'; // Adjust path to your Request model
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { requester, foodDonationPost } = reqBody;
   

    // Check if there's an existing request from the user for the specified donation post
    const existingRequest = await Request.findOne({
      requester: requester,
      foodDonationPost: foodDonationPost, // Assuming that 'rejected' status means the request is not active
    });

    return NextResponse.json({
      exists: !!existingRequest,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

