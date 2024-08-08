const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', isAuthenticated, userController.getProfile);
router.post('/profile', isAuthenticated, userController.updateName);
router.post('/reset-password', isAuthenticated, userController.resetPassword);
router.get('/dashboard', isAuthenticated, userController.getDashboard);
router.post('/logout', isAuthenticated, userController.logout);

module.exports = router;
