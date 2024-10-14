const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/feedforward");
const foodDonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  foodItems: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    description: {
      type: String,
      trim: true
    },
    imageUrls: [{
      type: String,
      trim: true
    }]
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  expirationDate: {
    type: Date,
    required: true
  },
  pickupAvailable: {
    type: Boolean,
    default: false
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

// Add an index to the location field for geospatial queries

const FoodDonation = mongoose.models.FoodDonation ||  mongoose.model('FoodDonation', foodDonationSchema);

module.exports = FoodDonation;
