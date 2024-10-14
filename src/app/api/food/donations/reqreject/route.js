import Request from '../../../../../models/Request';
import { NextResponse } from 'next/server';

export async function PATCH(request) {
    const reqBody = await request.json();
    const {requestId} = reqBody;
  
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status: 'rejected', responseDate: new Date() },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Request rejected successfully', request: updatedRequest });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
