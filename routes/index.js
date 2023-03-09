const express = require('express');

const router = express.Router();

router.use('/', require('./swagger.js'));

router.use('/users', require('./users'));

router.use('/teams', require('./teams'));
router.use('/players', require('./players'));
router.use('/games', require('./games'));

module.exports = router;