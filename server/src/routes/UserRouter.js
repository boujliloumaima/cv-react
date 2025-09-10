import express from "express";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controller/UserController.js";
const router = express.Router();
router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
export default router;
