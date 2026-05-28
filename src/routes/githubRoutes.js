const express = require("express");
const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
} = require("../controllers/githubController");

// Health check / base route
router.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile Analyzer API is running",
    routes: {
      analyze: "/analyze/:username",
      getAllProfiles: "/profiles",
      getSingleProfile: "/profiles/:username",
    },
  });
});

// Analyze GitHub user
router.get("/analyze/:username", analyzeProfile);

// Get all saved profiles
router.get("/profiles", getAllProfiles);

// Get single profile
router.get("/profiles/:username", getSingleProfile);

module.exports = router;