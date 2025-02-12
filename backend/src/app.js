const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors({ origin: "https://healthsense-fastresp.vercel.app" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HealthSense API" });
});

const graphRoutes = require("./routes/graphRoutes");
const healthRoutes = require("./routes/healthRoutes");
const heatmapRoutes = require("./routes/heatmapRoutes");
const exportRoutes = require("./routes/exportRoutes");
const educationRoutes = require("./routes/educationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/api/graph", graphRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/subscribe", subscriptionRoutes);

module.exports = app;