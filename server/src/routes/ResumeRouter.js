import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createResume,
  getResumes,
  getResumesByUser,
  getResumeById,
} from "../controller/ResumeController.js";
const router = express.Router();
router.get("/", verifyToken, getResumes);
// protect the createResume route with JWT middleware
router.post("/", verifyToken, createResume);
router.get("/resumes", verifyToken, getResumesByUser);
router.get("/:id", getResumeById);
export default router;
