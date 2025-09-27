import express from "express";
import { verifyAdminToken } from "../middlewares/auth.js";
import { getResumes } from "../controller/ResumeController.js";

const router = express.Router();

router.get("/resumes/all", verifyAdminToken, getResumes);

export default router;
