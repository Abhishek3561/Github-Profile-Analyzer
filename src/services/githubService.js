const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const profileResponse = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const repoResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return {
    profile: profileResponse.data,
    repos: repoResponse.data,
  };
};

module.exports = fetchGithubProfile;