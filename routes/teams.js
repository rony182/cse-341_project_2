const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const { teamCreation } = require('../helpers/validation');

router.get('/', teamsController.getTeams);

router.get('/:id', teamsController.getTeam);

router.post('/', teamCreation, teamsController.createTeam);

router.put('/:id', teamCreation, teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

module.exports = router;