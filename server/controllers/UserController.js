import User from "../models/User.js";
import logger from "../logger.js";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    logger.info(`User created: ${user.name} (${user.email})`);
    res.status(201).json(user);
  } catch (err) {
    logger.error(`Failed to create user: ${err.message}`);
    res.status(400).json({ error: err.message });
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
