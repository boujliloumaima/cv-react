import express from "express";
import userRoutes from "./src/routes/UserRouter.js";
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

export default app;
