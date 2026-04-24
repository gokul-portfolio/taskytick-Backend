const express = require("express");
const cors = require("cors");

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/auth", require("./models/auth/auth.routes"));

// 🔹 Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    server: "Running",
    timestamp: new Date(),
  });
});

// 🔹 404 Handler (use next)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// 🔹 Global Error Handler
const errorMiddleware = require("./middleware/error.middleware");
app.use(errorMiddleware);

module.exports = app;