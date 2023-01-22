const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please Enter Your FirstName "],
      trim: true,
      min: [3, "First Name Cannot be less than 3 characters"],
      max: [50, "First Name Cannot be more than 50 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Please Enter Your LastName "],
      trim: true,
      min: 3,
      max: 50,
    },
    username: {
      type: String,
      required: [true, "Please Enter Your UserName "],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      trim: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: [true, "Please Enter Your Password "],
      trim: true,
      min: 8,
      max: 16,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter Your PhoneNumber "],
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.virtual('password').set(function(password){
    const genSalt = bcrypt.genSaltSync(10)
    this.hash_password = bcrypt.hashSync(password, genSalt)
})

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    },
}

module.exports = mongoose.model('User', userSchema)