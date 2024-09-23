const Quote = require('../models/quotes');

// exports.getRequestedQuotes = async (req, res) => {
//   try {
//     const { googleId } = req.body;

//     if (!googleId) {
//       return res.status(400).json({ message: 'Google ID is required' });
//     }

//     const quotes = await Quote.find({ googleId });

//     if (!quotes.length) {
//       return res.status(404).json({ message: 'No quotes found for this Google ID' });
//     }

//     res.status(200).json(quotes);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching quotes', error });
//   }
// };

exports.getRequestedQuotes = async (req, res) => {
  try {
    // Fetch quotes where the 'cost' field exists
    const quotes = await Quote.find({ cost: { $exists: false } });

    if (!quotes.length) {
      return res.status(404).json({ message: 'No quotes found with cost' });
    }

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error });
  }
};

// Fetch a specific quote by ID
exports.getQuoteById = async (req, res) => {
  const { quoteId } = req.params;
  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific quote by ID
exports.deleteQuote = async (req, res) => {
  const { quoteId } = req.params;
  try {
    const quote = await Quote.findByIdAndDelete(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update quote details
exports.updateQuoteDetails = async (req, res) => {
  const { quoteId } = req.params;
  const {
    accommodationCost,
    flightTicketCost,
    trainTicketCost,
    taxiRentalCost,
    personCount,
    subTotal,
    tax,
    totalCost,
  } = req.body.cost; // Access the cost object from the request body

  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      quoteId,
      {
        'cost.accommodationCost': accommodationCost,
        'cost.flightTicketCost': flightTicketCost,
        'cost.trainTicketCost': trainTicketCost,
        'cost.taxiRentalCost': taxiRentalCost,
        'cost.personCount': personCount,
        'cost.subTotal': subTotal,
        'cost.tax': tax,
        'cost.totalCost': totalCost,
      },
      { new: true }, // Return the updated document
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quote details', error });
  }
};

// Get revised quotes
exports.getRevisedQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ revision: { $exists: true } });

    if (!quotes.length) {
      return res.status(404).json({ message: 'No revised quotes found' });
    }

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revised quotes', error });
  }
};
