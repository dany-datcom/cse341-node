const express = require('express');
const router = express.Router();

const auth = require('../middleware/authenticate');

const gamesController = require('../controllers/games');

router.get('/', auth.isAuthenticated, gamesController.getAll);

router.get('/:id', auth.isAuthenticated, gamesController.getSingle);

router.post('/', auth.isAuthenticated, gamesController.createGame);

router.put('/:id', auth.isAuthenticated, gamesController.updateGame);

router.delete('/:id', auth.isAuthenticated, gamesController.deleteGame);

module.exports = router;