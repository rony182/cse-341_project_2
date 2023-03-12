const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');
const { playerCreation } = require('../helpers/validation');

router.get('/', playersController.getPlayers);

router.get('/:id', playersController.getPlayer);

router.post('/', playerCreation, playersController.createPlayer);

router.put('/:id', playerCreation, playersController.updatePlayer);

router.delete('/:id', playersController.deletePlayer);

module.exports = router;