import express from "express";
import userRoutes from "./src/routes/UserRouter.js";
import cookieParser from "cookie-parser";
import resumeRoutes from "./src/routes/ResumeRouter.js";
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
app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
export default app;
