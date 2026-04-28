const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.registerUser);
router.get('/me', authMiddleware, authController.me);
router.put('/me', authMiddleware, authController.updateMe);
router.put('/me/password', authMiddleware, authController.changePassword);

module.exports = router;
