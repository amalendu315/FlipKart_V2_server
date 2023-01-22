const express = require('express');
const { signup } = require('../../controllers/user');
const User = require('../../models/User');


const router = express.Router();


router.post('/signin', (req, res) => {
    res.status(201).json({
        message: 'User signed in',
        body: req.body
    })
});
router.post('/signup', signup);


module.exports = router;