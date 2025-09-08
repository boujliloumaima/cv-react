import mongoose from "mongoose";

const institutSchema = new mongoose.Schema({
  name: String,
  description: String,
  city: String,
});

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    required: true,
  },
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  type: {
    type: Number,
    enum: [0, 1],
    required: true,
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
    name: { type: String, required: true },
    phone: { type: String, required: true },
    nationalite: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true },
    gender: {
      type: Number,
      enum: [0, 1],
      required: true,
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
