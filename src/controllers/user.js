const User = require("../models/User")

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(401).json({
        message: "User already registered",
      });

    const {
      firstname,
      lastname,
      email,
      password,
      username,
      phoneNumber,
      role,
    } = req.body;

    const _user = new User({
      firstname,
      lastname,
      email,
      password,
      username,
      phoneNumber,
      role,
    });
    _user.save((err, data) => {
      if (err)
        return res.status(500).json({
          message: `${err.message}`,
        });
      res.status(201).json({
        success: true,
        message: "User Created Successfully.",
      });
    });
  });
};