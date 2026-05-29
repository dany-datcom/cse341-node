const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');

const reviewsController = require('../controllers/reviews');

router.get('/', auth.isAuthenticated, reviewsController.getAll);

router.get('/:id', auth.isAuthenticated, reviewsController.getSingle);

router.post('/', auth.isAuthenticated, reviewsController.createReview);

router.put('/:id', auth.isAuthenticated, reviewsController.updateReview);

router.delete('/:id', auth.isAuthenticated, reviewsController.deleteReview);

module.exports = router;