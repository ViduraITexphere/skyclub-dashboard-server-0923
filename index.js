const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');
const placeRoutes = require('./routes/placeRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(cors());

// Middleware to parse JSON
app.use(express.json({ limit: '10mb' })); // Adjust the size as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For form data

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api', quoteRoutes);
app.use('/api', placeRoutes);
app.use('/api', hotelRoutes);
app.use('/api', emailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
