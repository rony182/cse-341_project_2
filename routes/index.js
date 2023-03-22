const express = require('express');
const router = express.Router();
const { verifyToken } = require('../helpers/jwt.js');

router.use('/', require('./swagger.js'));
router.use('/users', require('./users'));

router.use('/teams', verifyToken, require('./teams'));
router.use('/players', verifyToken, require('./players'));
router.use('/games', verifyToken, require('./games'));

module.exports = router;
