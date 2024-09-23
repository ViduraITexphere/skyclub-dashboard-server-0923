const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  description: String,
  image: String,
  rating: Number,
  reviews: Number,
  category: String,
  duration: Number,
  hours: String,
  tags: [String],
  activities: [String],
  featured: Boolean,
  verified: Boolean,
  recommended: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
