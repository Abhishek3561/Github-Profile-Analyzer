const calculateInsights = (profile, repos) => {
  let totalStars = 0;
  let totalForks = 0;

  const languages = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }
  });

  let mostUsedLanguage = null;
  let max = 0;

  for (let lang in languages) {
    if (languages[lang] > max) {
      max = languages[lang];
      mostUsedLanguage = lang;
    }
  }

  const topRepo = repos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  return {
    github_id: profile.id,
    username: profile.login,
    name: profile.name,
    bio: profile.bio,
    followers: profile.followers,
    following: profile.following,
    public_repos: profile.public_repos,
    total_stars: totalStars,
    total_forks: totalForks,
    most_used_language: mostUsedLanguage,
    top_repo: topRepo ? topRepo.name : null,
    account_created_at: new Date(profile.created_at)
  .toISOString()
  .slice(0, 19)
  .replace("T", " "),
  };
};

module.exports = calculateInsights;