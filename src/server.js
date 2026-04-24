require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.config");

const PORT = process.env.PORT || 5000;

// Connect DB first
connectDB();

// Start server
app.listen(PORT, () => {
  console.log("Server started successfully");
  console.log(`Running on: http://localhost:${PORT}`);
});
