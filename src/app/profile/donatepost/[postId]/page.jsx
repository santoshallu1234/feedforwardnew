"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Requests({ params }) {
 // Get postId from the URL
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const postId = params.postId ;
  // Fetch requests for a particular post
  const getRequests = async () => {
    try {
      console.log(params.postId)
      const response = await axios.get(`../../../api/food/donations/requests/${params.postId}`);
      setRequests(response.data.requests);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load requests.");
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axios.patch("../../../api/food/donations/reqapprove",{requestId:requestId});
      toast.success("Request approved!");
      getRequests(); // Refresh the list after approval
    } catch (error) {
      toast.error("Failed to approve request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.patch("../../../api/food/donations/reqreject",{requestId:requestId});
      toast.success("Request rejected!");
      getRequests(); // Refresh the list after rejection
    } catch (error) {
      toast.error("Failed to reject request.");
    }
  };

  useEffect(() => {
    if (postId) {
    getRequests();
    }
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Requests for this Post</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <p><strong>Requester:</strong> {request.requester.name}</p>
              <p><strong>Message:</strong> {request.requestMessage}</p>
              <p><strong>Status:</strong> {request.status}</p>
              {request.status === "pending" && (
                <div>
                  <button
                    className="mr-4 bg-green-500 text-white p-2 rounded"
                    onClick={() => handleApprove(request._id)}
                  >
                   Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
