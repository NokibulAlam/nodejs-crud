const express = require('express');

const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/user', apiController.getUser);

router.post('/postuser', apiController.postUser);

module.exports = router;