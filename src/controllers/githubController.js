const db = require("../config/db");

const fetchGithubProfile = require("../services/githubService");

const calculateInsights = require("../utils/calculateInsights");

exports.analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const data = await fetchGithubProfile(username);

    const insights = calculateInsights(data.profile, data.repos);

    const sql = `
      INSERT INTO github_profiles
      (
        github_id,
        username,
        name,
        bio,
        followers,
        following,
        public_repos,
        total_stars,
        total_forks,
        most_used_language,
        top_repo,
        account_created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        followers = VALUES(followers),
        following = VALUES(following),
        public_repos = VALUES(public_repos),
        total_stars = VALUES(total_stars),
        total_forks = VALUES(total_forks),
        most_used_language = VALUES(most_used_language),
        top_repo = VALUES(top_repo)
    `;

    await db.query(sql, [
      insights.github_id,
      insights.username,
      insights.name,
      insights.bio,
      insights.followers,
      insights.following,
      insights.public_repos,
      insights.total_stars,
      insights.total_forks,
      insights.most_used_language,
      insights.top_repo,
      insights.account_created_at,
    ]);

    res.json({
      message: "Profile analyzed successfully",
      data: insights,
    });

  } catch (error) {
  console.log("🔥 FULL ERROR:", error);

  return res.status(500).json({
    error: error.message || "Unknown error",
    details: error.toString(),
  });
}
};

exports.getAllProfiles = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM github_profiles");
    res.json(results);
  } catch (error) {
  console.log("🔥 FULL ERROR:", error);

  return res.status(500).json({
    error: error.message || "Unknown error",
    details: error.toString(),
  });
}
};

exports.getSingleProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const [results] = await db.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username]
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(results[0]);
  } catch (error) {
  console.log("🔥 FULL ERROR:", error);

  return res.status(500).json({
    error: error.message || "Unknown error",
    details: error.toString(),
  });
}
};