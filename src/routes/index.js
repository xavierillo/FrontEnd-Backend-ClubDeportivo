const { Router } = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const sportRoutes = require('./sport.routes');
const roomRoutes = require("./room.routes");

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/sport', sportRoutes);
router.use("/rooms", roomRoutes);

module.exports = router;
