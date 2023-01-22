const express = require('express');
const authRoutes = require('./mainRoutes/auth');
const adminAuthRoutes = require('./admin/auth');
const userRoutes = require('./mainRoutes/user');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminAuthRoutes);
router.use('/user', userRoutes);

module.exports = router;