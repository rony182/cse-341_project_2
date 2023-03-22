const express = require('express');
const router = express.Router();
const Validation = require('../helpers/validation');
const passport = require('../helpers/passport');

const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);

router.get('/:id', usersController.getUser);

router.post('/', Validation.userCreation, usersController.createUser);

router.post('/login', usersController.logUser);

router.put('/:id', Validation.userCreation, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
