export type GitHubUser = {
  login: string;
  name: string | undefined;
  avatar_url: string;
  bio: string | undefined;
  blog: string | undefined;
  location: string | undefined;
  public_repos: number;
  followers: number;
  following: number;
  totalStars: number;
  mostUsedLanguage: string | undefined;
  totalPRs: number;
  totalIssues: number;
  topLanguages: JSON;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | undefined;
  stargazers_count: number;
  forks_count: number;
  has_issues: boolean;
  created_at: string;
  updated_at: string;
  language: string | undefined;
};

export type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
};
