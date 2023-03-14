const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const Validation = require('../helpers/validation');

router.get('/', teamsController.getTeams);

router.get('/:id', teamsController.getTeam);

router.post('/', Validation.teamCreation, teamsController.createTeam);

router.put('/:id', Validation.teamCreation, teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

module.exports = router;