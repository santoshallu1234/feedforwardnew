import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/feedforward");
const userRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (the one making the request)
    required: true
  },
  foodDonationPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fooddonations', // Reference to the FoodDonation model (the post being requested)
    required: true
  },
  requestMessage: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  responseDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Optional: Add indexes for faster querying
//userRequestSchema.index({ requester: 1, foodDonationPost: 1 }, { unique: true });

const UserRequest =mongoose.models.UserRequest || mongoose.model('UserRequest', userRequestSchema);

module.exports = UserRequest;
