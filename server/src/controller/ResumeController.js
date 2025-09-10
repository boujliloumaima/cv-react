import Resume from "../models/Resume.js";
import { logger } from "../config/logger.js";

// CREATE RESUME/
export const createResume = async (req, res) => {
  try {
    const resume = new Resume({ ...req.body, userId: req.user.id });
    await resume.save();
    logger.info(`Resume created for userId: ${resume.userId}`);
    res.status(201).json(resume);
  } catch (err) {
    logger.error(`Failed to create resume: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

// GET ALL RESUMES
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate("userId", "name email");
    logger.info(`Fetched ${resumes.length} resumes`);
    res.json(resumes);
  } catch (err) {
    logger.error(`Failed to get resumes: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
// GET RESUMES BY USER ID
export const getResumesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await Resume.find({ userId }).populate(
      "userId",
      "name email"
    );
    logger.info(`Fetched ${resumes.length} resumes for userId: ${userId}`);
    res.json(resumes);
  } catch (err) {
    logger.error(
      `Failed to get resumes for userId ${req.params.userId}: ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};
