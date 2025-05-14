const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authJwt = require('../middleware/authJwt');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/verify', [authJwt.verifyToken], authController.verifyToken);
router.get('/profile', [authJwt.verifyToken], authController.getUserProfile);
router.put('/profile', [authJwt.verifyToken], authController.updateUserProfile);
router.post('/logout', [authJwt.verifyToken], authController.logout);

module.exports = router; 