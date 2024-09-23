const Place = require('../models/places');

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json({ message: 'Place created successfully', place: newPlace });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create place', error });
  }
};

exports.getAllPlaces = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    const total = await Place.countDocuments(); // Get the total count of documents
    const places = await Place.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.json({
      total,
      places,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error });
  }
};

// exports.getAllPlaces = async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1; // Default to page 1
//       const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
//       const skip = (page - 1) * limit;

//       // Extract filters from query parameters
//       const cityFilter = req.query.city || '';
//       const countryFilter = req.query.country || '';
//       const categoryFilter = req.query.category || '';
//       const sort = req.query.sort || 'date'; // Default sort by date

//       // Build the query object
//       const query = {};
//       if (cityFilter) query.city = cityFilter;
//       if (countryFilter) query.country = countryFilter;
//       if (categoryFilter) query.category = categoryFilter;

//       // Define sorting options
//       const sortOptions = {};
//       if (sort === 'date') {
//         sortOptions.date = -1; // Newest first
//       } else {
//         sortOptions[sort] = 1; // Default sort ascending
//       }

//       // Fetch the total count of documents with filters
//       const total = await Place.countDocuments(query);

//       // Fetch the filtered and sorted places
//       const places = await Place.find(query)
//         .sort(sortOptions)
//         .skip(skip)
//         .limit(limit);

//       res.json({
//         total,
//         places
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching places', error });
//     }
//   };

// Get a specific place by ID
exports.getPlaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching place details', error });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: 'Error updating place', error });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting place', error });
  }
};
