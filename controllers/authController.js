const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  bio: { type: String },
  profilePicture: { 
    type: String, 
    default: "" 
  },
  gender: { 
    type: String, 
    required: true, 
    enum: ["male", "female"] 
  }
}, { timestamps: true });

// Hashing password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, gender } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    //a feature for the profile picture -> Assigning default profile picture based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    const profilePicture = gender === "male" ? boyProfilePic : girlProfilePic;

    user = new User({ name, email, password, address, profilePicture, gender });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};


