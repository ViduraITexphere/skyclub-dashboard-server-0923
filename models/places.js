const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
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

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
