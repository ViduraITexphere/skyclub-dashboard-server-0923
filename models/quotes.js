// models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  itinerary: { type: Array, required: true }, // Itinerary details
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    passportNo: { type: String }, // Add passportNo field
    noOfPax: { type: Number }, // Add noOfPax field
    mealPlan: { type: String }, // Add mealPlan field
    hotelCategory: { type: String }, // Add hotelCategory field
    vehicleType: { type: String }, // Add vehicleType field
    specialRequirements: { type: String }, // Add specialRequirements field
    children: [{ type: String }], // Accept children as an array of strings (or numbers if you prefer)
  },
  cost: {
    accommodationCost: { type: Number, default: 0 },
    flightTicketCost: { type: Number, default: 0 },
    trainTicketCost: { type: Number, default: 0 },
    taxiRentalCost: { type: Number, default: 0 },
    personCount: { type: Number, default: 1 }, // Person count
    subTotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
  },
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
