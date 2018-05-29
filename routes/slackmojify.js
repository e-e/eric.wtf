const express = require('express');
const router = express.Router();
const controller = require('../controllers/slackmojify');

router.get('/', controller.index);

module.exports = router;
