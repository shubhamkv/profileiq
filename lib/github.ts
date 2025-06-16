import axios from "axios";

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
  } catch (error: any) {
    console.error(
      "Failed to fetch GitHub user",
      error?.response?.data || error
    );
    throw new Error("Failed to fetch GitHub user");
  }
}

export async function fetchGitHubRepos(username: string) {
  try {
    const res = await axiosInstance.get(
      `/users/${username}/repos?per_page=100`
    );
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch GitHub repos",
      error?.response?.data || error
    );
    throw new Error("Failed to fetch GitHub repos");
  }
}

export async function fetchGitHubEvents(username: string) {
  try {
    const res = await axiosInstance.get(`/users/${username}/events/public`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch GitHub events",
      error?.response?.data || error
    );
    throw new Error("Failed to fetch GitHub events");
  }
}
