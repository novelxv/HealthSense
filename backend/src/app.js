const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HealthSense API" });
});

const healthRoutes = require("./routes/healthRoutes");
app.use("/api/health", healthRoutes);

module.exports = app;