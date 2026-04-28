const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Logger (DEV ONLY)
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// 🔹 Routes
const authRoutes = require("./models/auth/auth.routes");
const userRoutes = require("./models/user/user.routes");
const taskRoutes = require("./models/task/task.routes");
const projectRoutes = require("./models/project/project.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);     // 👉 includes /me inside user.routes.js
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// 🔹 Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    server: "Running",
    timestamp: new Date(),
  });
});

// 🔹 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// 🔹 Global Error Handler (LAST)
const errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

module.exports = app;