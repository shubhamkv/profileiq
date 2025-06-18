import axios from "axios";
import { GitHubRepo } from "../types/github";

const BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "User-Agent": "ProfileIQ-App",
  },
});

export async function fetchGitHubUser(username: string) {
  try {
    const res = await axiosInstance.get(`/users/${username}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to fetch GitHub user",
        error?.response?.data || error
      );
    } else {
      console.error("Unknown error while fetching GitHub events", error);
    }
    throw new Error("Failed to fetch GitHub user");
  }
}

export async function fetchGitHubRepos(username: string) {
  try {
    const res = await axiosInstance.get(
      `/users/${username}/repos?per_page=100`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to fetch GitHub repos",
        error?.response?.data || error
      );
    } else {
      console.error("Unknown error while fetching GitHub events", error);
    }
    throw new Error("Failed to fetch GitHub repos");
  }
}

export async function fetchGitHubEvents(username: string) {
  try {
    const res = await axiosInstance.get(`/users/${username}/events/public`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to fetch GitHub events",
        error?.response?.data || error
      );
    } else {
      console.error("Unknown error while fetching GitHub events", error);
    }
    throw new Error("Failed to fetch GitHub events");
  }
}

export async function getGitHubProfileStats(username: string) {
  try {
    const languageBytes: Record<string, number> = {};
    let totalStars = 0;

    // Fetch public repos
    const reposRes = await axiosInstance.get(
      `/users/${username}/repos?per_page=100`
    );
    const repos = reposRes.data;

    const repoStatsPromises = repos.map(async (repo: GitHubRepo) => {
      // Accumulate stars
      totalStars += repo.stargazers_count;

      // Get languages
      try {
        const langRes = await axiosInstance.get(
          `/repos/${username}/${repo.name}/languages`
        );
        const langData = langRes.data;
        for (const [lang, bytes] of Object.entries(langData)) {
          languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number);
        }
      } catch {
        console.warn(`Lang error on: ${repo.name}`);
      }
    });

    await Promise.all(repoStatsPromises);

    const topLanguages = Object.entries(languageBytes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));

    const mostUsedLanguage = topLanguages[0].name;

    // Total PRs
    const prRes = await axiosInstance.get(
      `/search/issues?q=type:pr+author:${username}`
    );
    const totalPRs = prRes.data.total_count;

    // Total Issues
    const issueRes = await axiosInstance.get(
      `/search/issues?q=type:issue+author:${username}`
    );
    const totalIssues = issueRes.data.total_count;

    return {
      topLanguages,
      totalStars,
      mostUsedLanguage,
      totalPRs,
      totalIssues,
    };
  } catch (err) {
    console.error("GitHub stats error:", err);
    throw err;
  }
}
