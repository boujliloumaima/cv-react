import Resume from "../models/Resume.js";
import { logger } from "../config/logger.js";

// CREATE RESUME/
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!resume) {
      logger.warn(`Resume not found for userId: ${req.user.id}`);
      return res.status(404).json({ message: "Resume not found" });
    }
    logger.info(`Updated resume for userId: ${req.user.id}`);
    res.status(200).json(resume);
  } catch (err) {
    logger.error(`Failed to update resume: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!resume) {
      resume = new Resume({ ...req.body, userId: req.user.id });
    }
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

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Resume.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      logger.warn(`Resume not found: id=${id}`);
      return res.status(404).json({ message: "Resume not found" });
    }
    logger.info(`Deleted resume: id=${id}`);
    res.status(204).send();
  } catch (err) {
    logger.error(`Failed to delete resume: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      logger.warn(`Resume not found: id=${id}`);
      return res.status(404).json({ message: "Resume not found" });
    }

    logger.info(`Fetched resume: id=${id}, name=${resume.name}`);
    res.status(200).json(resume);
  } catch (error) {
    logger.error(
      `Failed to fetch resume id=${req.params.id}: ${error.message}`
    );
    res.status(500).json({ message: "Server error" });
  }
};
// GET RESUMES BY USER ID
export const getResumesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
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
