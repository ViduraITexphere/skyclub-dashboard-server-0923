const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/quotes', quoteController.getRequestedQuotes);
router.get('/quotes/:quoteId', quoteController.getQuoteById);
router.put('/quotes/:quoteId', quoteController.updateQuoteDetails);
router.delete('/quotes/:quoteId', quoteController.deleteQuote);
// get revised quotes
router.post('/quotes/revised', quoteController.getRevisedQuotes);

module.exports = router;
