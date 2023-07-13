const express = require('express');
const router = express.Router();
const {findUserById} = require('../controllers/testController');

// GET /users/:userId
router.get('/:userId', findUserById);

module.exports = router;
