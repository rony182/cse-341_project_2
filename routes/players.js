const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');

router.get('/', playersController.getPlayers);

router.get('/:id', playersController.getPlayer);

router.post('/', playersController.createPlayer);

router.put('/:id', playersController.updatePlayer);

router.delete('/:id', playersController.deletePlayer);

module.exports = router;