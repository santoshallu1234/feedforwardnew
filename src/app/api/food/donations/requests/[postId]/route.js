import Request from '../../../../../../models/Request';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { postId } = params;

  try {
    console.log(postId);
    const requests = await Request.find({ foodDonationPost: postId })
     // .populate('requester')  // Populate requester info
     // .lean();

    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}