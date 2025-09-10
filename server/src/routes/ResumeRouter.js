import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createResume,
  getResumes,
  getResumesByUser,
} from "../controller/ResumeController.js";
const router = express.Router();
router.get("/", getResumes);
// protect the createResume route with JWT middleware
router.post("/", verifyToken, createResume);
router.get("/:id", getResumesByUser);
export default router;
