const express = require("express");
const { requireSignin } = require("../../controllers/auth");
const { me } = require("../../controllers/user");

const router = express.Router();

router.get('/me',requireSignin,me)

module.exports = router;