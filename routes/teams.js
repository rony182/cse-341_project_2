const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getTeams);

router.get('/:id', teamsController.getTeam);

router.post('/', teamsController.createTeam);

router.put('/:id', teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

module.exports = router;