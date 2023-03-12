const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
const { gameCreation } = require('../helpers/validation');

router.get('/', gamesController.getGames);

router.get('/:id', gamesController.getGame);

router.post('/', gameCreation, gamesController.createGame);

router.put('/:id', gameCreation, gamesController.updateGame);

router.delete('/:id', gamesController.deleteGame);

module.exports = router;