const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const headers = process.env.GITHUB_TOKEN
    ? {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }
    : {};

  const profileResponse = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers }
  );

  const repoResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    { headers }
  );

  return {
    profile: profileResponse.data,
    repos: repoResponse.data,
  };
};

module.exports = fetchGithubProfile;