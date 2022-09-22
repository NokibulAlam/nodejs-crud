const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getIndex);

router.get('/create', userController.createUser);
router.post('/user', userController.postUser);

router.get('/profile/:id', userController.getProfile);
router.post('/profile/:id', userController.postProfile);

router.get('/delete/:id', userController.deleteUser);

/* For Cookies Routes */
router.route('/login')
    .get(userController.getLogin)
    .post(userController.postLogin);

/* FileUpload Route */
router.post('/fileupload', userController.FileUpload);

/* For Socket IO */

router.get('/msg', userController.getMsg);
    
module.exports = router;