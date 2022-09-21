const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getIndex);

router.get('/create', userController.getLogin);
router.post('/user', userController.postUser);

router.get('/profile/:id', userController.getProfile);
router.post('/profile/:id', userController.postProfile);

router.get('/delete/:id', userController.deleteUser);

/* For Cookies Routes */
router.route('/login')
    .get(userController.getLogin)
    .post(userController.postLogin);
    
module.exports = router;