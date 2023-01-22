const User = require("../models/User");

exports.me = (req, res) => {
    User.findOne({ _id: req.user._id }).exec((err, user) => {
        if (err)
        return res.status(500).json({
            message: `${err.message}`,
        });
        const { fullname, email, role, username, phoneNumber, profilePicture } = user;
        res.status(200).json({
          success: true,
          user: {
            fullname,
            email,
            role,
            username,
            phoneNumber,
            profilePicture,
          },
        });
    });
};
