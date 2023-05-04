import User from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, imgUrl } = req.body;
  if (!name || !email || !password || !imgUrl) {
    res.status(400).json({ message: "Please fill all fields" });
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  //hash password
  const hashedPassword = await bycrypt.hash(password, 10);

  //create user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    imgUrl,
  });

  //save user
  try {
    await user.save();
    res.status(201).json({ message: "user created", user, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if user already exists
  const user = await User.findOne({ email });

  try {
    if (user && (await bycrypt.compare(password, user.password))) {
      res.status(200).json({ user, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getLoggedInUser = asyncHandler(async (req, res, next) => {
  try {
    const { _id, name, email} = await User.findById(req.user._id);
    res.status(200).json({
        id: _id,
        name,
        email,
    });
  } catch (err) {
    next(err);
  }
});

export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
