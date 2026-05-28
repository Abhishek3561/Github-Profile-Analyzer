require("dotenv").config();

const express = require("express");
const cors = require("cors");

const githubRoutes = require("./routes/githubRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/github", githubRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});