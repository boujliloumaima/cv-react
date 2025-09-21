import mongoose from "mongoose";

const institutSchema = new mongoose.Schema({
  name: String,
  description: String,
  city: String,
});

const languageSchema = new mongoose.Schema({
  name: String,
  level: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
  },
});

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  type: {
    type: Number,
    enum: [0, 1],
  },
});

const educationSchema = new mongoose.Schema({
  institut: institutSchema,
  diploma: String,
  modules: [String],
  startdate: Date,
  enddate: Date,
});

const experienceSchema = new mongoose.Schema({
  company: { type: institutSchema },
  startdate: Date,
  enddate: Date,
  tasks: [String],
  tools: [String],
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    phone: String,
    nationalite: String,
    birthday: Date,
    email: String,
    jobTitle: String,
    gender: {
      type: Number,
      enum: [0, 1],
    },
    languages: [languageSchema],
    skills: [skillSchema],
    educations: [educationSchema],
    experiences: [experienceSchema],
    yearsOfExperience: Number,
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
