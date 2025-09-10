import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger.js";
import bcrypt from "bcryptjs";
import ENV from "../config/index.js";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.info(
        `Tried to sign up with an email that is already used : ${email}`
      );
      return res.status(400).json({ message: "Email already used." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    logger.info(`New user registered: ${email}`);
    const { password: _, ...userData } = newUser.toObject();
    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    logger.error("Error during registration", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      logger.info(`Login failed: user not found - ${email}`);
      return res.status(404).json({ message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      logger.info(`Login failed: incorrect password - ${email}`);
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: "24h" });
    const { password: _, ...userData } = user.toObject();
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info(`Login successful: ${email} (${user.role})`);
    res.status(200).json({ message: "Welcome user", user: userData });
  } catch (error) {
    logger.error("Error during login", error);
    res.status(500).json({ message: "Server error" });
  }
};
// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    logger.info(`Fetched ${users.length} users`);
    res.json(users);
  } catch (err) {
    logger.error(`Failed to get users: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
