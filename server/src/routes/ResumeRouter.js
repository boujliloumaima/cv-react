import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createResume,
  getResumes,
  getResumesByUser,
  getResumeById,
} from "../controller/ResumeController.js";
const router = express.Router();
// protect the createResume route with JWT middleware
router.post("/", verifyToken, createResume);
router.get("/", verifyToken, getResumesByUser);
router.get("/:id", verifyToken, getResumeById);
export default router;
