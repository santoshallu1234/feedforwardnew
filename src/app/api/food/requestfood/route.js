
import Request from '../../../../models/Request';
import { NextRequest, NextResponse } from 'next/server';

// Ensure to connect to MongoDB


// POST /api/requests
export async function POST(request) {
  try {
    

    const reqBody = await request.json();
    const { requester, foodDonationPost, requestMessage } = reqBody;

    // Validate the data
    if (!requester || !foodDonationPost || !requestMessage) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Create a new request
    const newRequest = new Request({
      requester,
      foodDonationPost,
      requestMessage,
    });

    const savedRequest = await newRequest.save();

    return NextResponse.json({
      message: 'Request created successfully',
      data: savedRequest,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
