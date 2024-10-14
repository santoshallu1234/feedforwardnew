import FoodDonation from '../../../../../models/Post';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';  // Assuming next-auth is used for auth

export async function PATCH(request, { params }) {
    const reqBody = await request.json();
    const {postId} = reqBody;

  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const reqBody = await request.json();

    const updatedPost = await FoodDonation.findOneAndUpdate(
      { _id: postId, donor: userId },  // Ensure user is editing their own post
      reqBody,
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
