const express = require("express");
const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
} = require("../controllers/githubController");


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


router.get("/analyze/:username", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", getSingleProfile);

module.exports = router;