const db = require("../config/db");

const fetchGithubProfile = require("../services/githubService");

const calculateInsights = require("../utils/calculateInsights");

exports.analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const data = await fetchGithubProfile(username);

    const insights = calculateInsights(
      data.profile,
      data.repos
    );

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

    db.query(
      sql,
      [
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
      ],
      (err) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }

        res.json({
          message: "Profile analyzed successfully",
          data: insights,
        });
      }
    );
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "GitHub user not found",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllProfiles = (req, res) => {
  const sql = "SELECT * FROM github_profiles";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results);
  });
};

exports.getSingleProfile = (req, res) => {
  const { username } = req.params;

  const sql =
    "SELECT * FROM github_profiles WHERE username = ?";

  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(results[0]);
  });
};