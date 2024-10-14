// pages/donations.js
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import RequestForm from './requestfood';
import {toast} from 'react-hot-toast';
export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [userId, setUserId] = useState('66d3a6179779735b1b46f947');
  const [alreadyreq, setalreadyreq] = useState(false);
 
  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await axios.get('../../api/food/donations');
        setDonations(response.data.data);
      } catch (err) {
        setError('Failed to fetch donations.');
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDonations();
  }, []);
  

  const handleRequestClick = async (donationId) => {
    
    try {
         
        const response2 = await axios.post('../../api/food/alreadyrequested', {
          requester: userId,
          foodDonationPost: donationId,
        });
        console.log(response2);
        if (response2.data.exists) {
          toast.error('You have already requested this donation.');
          
        } else {
          setSelectedDonationId(donationId);
          setShowRequestForm(true);
         
        }
      } catch (error) {
        toast.error('Failed to check request status.');
      }

     
  };


  const handleRequestSubmitted = () => {
    setShowRequestForm(false);
    setSelectedDonationId(null);
    // Refresh donations or handle UI update if needed
  };

  return (
    <>
   
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl mb-6">Food Donations</h1>
      <div className="space-y-4">
        {donations.map((donation) => (
          <div key={donation._id} className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-white text-xl mb-2">{donation.foodItems.map(item => item.name).join(', ')}</h2>
            <p className="text-gray-300">{donation.location.coordinates.join(', ')}</p>
         
            
              <button
                onClick={() => handleRequestClick(donation._id)}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                Request Food
              </button>
           
            
          </div>
        ))}
      </div>

      {showRequestForm && selectedDonationId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <RequestForm
              donationId={selectedDonationId}
              onRequestSubmitted={handleRequestSubmitted}
              alreadyreq ={alreadyreq}
            />
           
            <button
              onClick={() => setShowRequestForm(false)}
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
