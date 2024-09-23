const Hotel = require('../models/hotels');

// Create a new hotel
exports.createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create hotel', error });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    const total = await Hotel.countDocuments(); // Get the total count of documents
    // Fetch hotels sorted by creation date in descending order, paginated
    const places = await Hotel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.json({
      total,
      places,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error });
  }
};

// Get a specific place by ID
exports.getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Hotel details', error });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating place', error });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting place', error });
  }
};
