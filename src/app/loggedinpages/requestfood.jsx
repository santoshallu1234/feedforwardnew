import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RequestForm = ({ donationId, onRequestSubmitted }) => {
  const [requestMessage, setRequestMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('../api/food/requestfood', {
        requester: '66d3a6179779735b1b46f947', // This should be dynamic based on the logged-in user
        foodDonationPost: donationId,
        requestMessage,
      });

      toast.success('Request submitted successfully');
      setRequestMessage('');
      onRequestSubmitted(); // Callback to refresh the donation data
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-white text-xl mb-2">Request Food</h2>
      <textarea
        value={requestMessage}
        onChange={(e) => setRequestMessage(e.target.value)}
        placeholder="Enter your request message here..."
        className="w-full p-2 mb-4 rounded-md border border-gray-600 bg-gray-900 text-white"
        rows="4"
        required
      />
      <button
        type="submit"
        className={`w-full p-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default RequestForm;
