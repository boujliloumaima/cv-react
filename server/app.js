import express from "express";
import userRoutes from "./src/routes/UserRouter.js";
import cookieParser from "cookie-parser";
import resumeRoutes from "./src/routes/ResumeRouter.js";
import adminRoutes from "./src/routes/adminRoutes.js";

import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
