import { GitHubEvent, GitHubRepo, GitHubUser } from "../types/github";
import { fetchGitHubUser, fetchGitHubRepos, fetchGitHubEvents } from "./github";

export type ScoreResult = {
  score: number;
  good: string[];
  bad: string[];
  insights: string[];
  profile: {
    login: string;
    name?: string;
    avatar_url?: string;
    bio?: string;
    blog?: string;
    location?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
  };
};

export async function calculateGithubScore(
  username: string
): Promise<ScoreResult> {
  const user: GitHubUser = await fetchGitHubUser(username);
  const repos: GitHubRepo[] = await fetchGitHubRepos(username);
  const events: GitHubEvent[] = await fetchGitHubEvents(username);

  let score = 0;
  const good: string[] = [];
  const bad: string[] = [];
  const insights: string[] = [];

  // Profile Completeness (15)
  let profileScore = 0;
  if (user.bio) profileScore += 5;
  if (user.blog) profileScore += 5;
  if (user.location) profileScore += 3;
  if (user.avatar_url) profileScore += 2;

  if (profileScore >= 10) good.push("Profile is well-filled");
  else bad.push("Complete your GitHub profile with bio, blog, and location");

  score += profileScore;

  // Repositories (20)
  const repoCount = repos.length;
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const popularRepos = repos.filter((r) => r.stargazers_count > 10);

  let repoScore = 0;
  if (repoCount >= 10) repoScore += 8;
  if (totalStars >= 50) repoScore += 6;
  if (popularRepos.length >= 3) repoScore += 6;

  if (repoScore >= 15) good.push("Good number of quality repositories");
  else bad.push("Create more repositories or improve existing ones");

  score += repoScore;

  // Activity (20)
  let activityScore = 0;
  const pushEvents = events.filter((e) => e.type === "PushEvent");
  const prEvents = events.filter((e) => e.type === "PullRequestEvent");

  if (pushEvents.length >= 10) activityScore += 10;
  if (prEvents.length >= 5) activityScore += 10;

  if (activityScore >= 15) good.push("Very active recently");
  else bad.push("Increase your commit and PR activity");

  score += activityScore;

  // Community (15)
  let communityScore = 0;
  if (user.followers >= 50) communityScore += 10;
  if (user.following >= 30) communityScore += 5;

  if (communityScore >= 10) good.push("Good community involvement");
  else bad.push("Engage more with the community");

  score += communityScore;

  // Contributions (20)
  let contributionScore = 0;
  if (pushEvents.length >= 15) contributionScore += 10;
  if (prEvents.length >= 10) contributionScore += 10;

  if (contributionScore >= 15) good.push("Consistent contributions");
  else bad.push("Increase contributions via commits and PRs");

  score += contributionScore;

  // Code Quality (10)
  let qualityScore = 0;
  const reposWithReadme = repos.filter((r) => r.description);
  if (reposWithReadme.length >= 5) qualityScore += 5;
  if (repos.some((r) => r.has_issues)) qualityScore += 5;

  if (qualityScore >= 7) good.push("Repositories have good documentation");
  else bad.push("Add README and enable issues in repos");

  score += qualityScore;

  // Insights
  if (score >= 80) insights.push("Excellent! You're doing great on GitHub.");
  if (score >= 60 && score < 80)
    insights.push("Good job! A few improvements can boost your profile.");
  if (score < 60)
    insights.push(
      "Needs improvement. Focus on completing your profile and contributing regularly."
    );

  return {
    score,
    good,
    bad,
    insights,
    profile: {
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      bio: user.bio,
      blog: user.blog,
      location: user.location,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
    },
  };
}
