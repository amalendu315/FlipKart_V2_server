const User = require("../models/User")
const jwt = require('jsonwebtoken')

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
    } = req.body;

    const _user = new User({
      firstname,
      lastname,
      email,
      password,
      username,
      phoneNumber,
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

exports.signin = (req, res) => {
  User.findOne({username:req.body.username}).exec((error, user)=>{
    if(error) return res.status(500).json({
      success:false,
      message:error.message
    })
    if(user.authenticate(req.body.password)){
      const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, { expiresIn:'5h' });
      const {
        _id,
        fullname,
        email,
        role,
        phoneNumber
      } = user;
      res.status(200).json({
        success:true,
        token,
        user:{
          _id,
          fullname,
          email,
          role,
          phoneNumber,
        }
      })
    } else{
      return res.status(400).json({
        success:false,
        message:'Invalid Credentials'
      })
    }
  })
}

exports.requireSignin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied",
    });
  }
  const splitToken = token.split(" ")[1];
  const user = jwt.verify(splitToken, process.env.JWT_SECRET);
  req.user = user;
  next();
};