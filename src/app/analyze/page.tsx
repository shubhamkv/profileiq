"use client";

import { useState } from "react";
import { GitHubUser } from "../../../types/github";
import axios from "axios";
import { ScoreResult } from "../../../lib/score";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  AlertCircle,
  BarChart2,
  Bug,
  Code,
  FileCode,
  GitPullRequest,
  Globe,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function AnalyzePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [analysis, setAnalysis] = useState<ScoreResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.github) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/score", {
        name: formData.name,
        email: formData.email,
        username: formData.github,
      });

      const data = response.data;

      setAnalysis({
        score: data.score,
        good: data.good,
        bad: data.bad,
        insights: data.insights,
        profile: {
          login: data.profile.login,
          name: data.profile.name,
          bio: data.profile.bio,
          avatar_url: data.profile.avatar_url,
          followers: data.profile.followers,
          following: data.profile.following,
          public_repos: data.profile.public_repos,
          blog: data.profile.blog,
          location: data.profile.location,
        },
      });

      setUserData({
        login: data.profile.login,
        name: data.profile.name,
        bio: data.profile.bio,
        avatar_url: data.profile.avatar_url,
        followers: data.profile.followers,
        following: data.profile.following,
        public_repos: data.profile.public_repos,
        blog: data.profile.blog,
        location: data.profile.location,
        totalStars: data.githubStats.totalStars,
        mostUsedLanguage: data.githubStats.mostUsedLanguage,
        totalPRs: data.githubStats.totalPRs,
        totalIssues: data.githubStats.totalIssues,
        topLanguages: data.githubStats.topLanguages,
      });
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  type LanguageData = { name: string; value: number };

  const rawLanguages = (userData?.topLanguages ??
    []) as unknown as LanguageData[];

  // Calculate total bytes
  const total = rawLanguages.reduce((sum, lang) => sum + lang.value, 0);

  // Convert to percentage data
  const pieChartData = rawLanguages.map((lang) => ({
    name: lang.name,
    value: parseFloat(((lang.value / total) * 100).toFixed(2)),
  }));

  const COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20 dark:border-slate-700/20">
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            {`${data.name}: ${data.value.toFixed(2)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 transform transition-all duration-700 ease-out">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            GitHub Profile Analyzer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Analyze your GitHub profile and get comprehensive insights to
            improve your developer presence
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8 mb-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-lg backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-lg backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* GitHub Username */}

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400">
                GitHub Username
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="flex-1 px-5 py-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white transition-all duration-300 hover:shadow-lg backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter GitHub username"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:scale-100 disabled:cursor-not-allowed transform active:scale-95 shadow-lg cursor-pointer w-full sm:w-auto"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze"
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-5 bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  {error}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        {userData && analysis && (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Profile and Score Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] group">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <div className="flex-shrink-0 relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 p-1 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={userData.avatar_url}
                        alt={userData.name || userData.login}
                        className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-xl"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-2">
                        {userData.name || userData.login}
                      </h2>
                      <p className="text-cyan-600 dark:text-cyan-400 font-medium text-lg">
                        @{userData.login}
                      </p>
                    </div>

                    {userData.bio && (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50/50 dark:bg-slate-700/50 rounded-lg p-3">
                        {userData.bio}
                      </p>
                    )}

                    <div className="flex flex-wrap justify-center sm:justify-start gap-8">
                      <div className="text-center group/stat cursor-pointer">
                        <div className="font-bold text-xl text-gray-900 dark:text-white transition-colors group-hover/stat:text-cyan-600 dark:group-hover/stat:text-cyan-400">
                          {userData.followers.toLocaleString()}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                          Followers
                        </div>
                      </div>
                      <div className="text-center group/stat cursor-pointer">
                        <div className="font-bold text-xl text-gray-900 dark:text-white transition-colors group-hover/stat:text-cyan-600 dark:group-hover/stat:text-cyan-400">
                          {userData.following.toLocaleString()}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                          Following
                        </div>
                      </div>
                      <div className="text-center group/stat cursor-pointer">
                        <div className="font-bold text-xl text-gray-900 dark:text-white transition-colors group-hover/stat:text-cyan-600 dark:group-hover/stat:text-cyan-400">
                          {userData.public_repos.toLocaleString()}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                          Repositories
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 text-medium">
                      {userData.location && (
                        <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-6 h-6 dark:text-indigo-400 text-indigo-600" />{" "}
                          {userData.location}
                        </span>
                      )}
                      {userData.blog && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-6 h-6 dark:text-indigo-400 text-indigo-600" />
                          <a
                            href={
                              userData.blog.startsWith("http")
                                ? userData.blog
                                : `https://${userData.blog}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 dark:text-cyan-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 font-medium hover:underline"
                          >
                            {userData.blog}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Card */}
              <div className="bg-gradient-to-br from-cyan-500  to-indigo-500 rounded-2xl shadow-2xl p-8 text-white transform transition-all duration-500 hover:shadow-3xl hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative z-10 text-center">
                  <h3 className="text-xl text-indigo-700 font-bold mb-6">
                    Profile Score
                  </h3>

                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <svg
                      className="w-28 h-28 transform -rotate-90 drop-shadow-lg"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeDasharray={`${analysis.score}, 100`}
                        className="drop-shadow-sm"
                        style={{
                          strokeDashoffset: 0,
                          animation: "dash 2s ease-in-out forwards",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold drop-shadow-lg">
                        {analysis.score}
                      </span>
                    </div>
                  </div>

                  <p className="text-medium opacity-90 font-medium">
                    Out of 100
                  </p>
                  <div className="mt-4 text-medium font-bold opacity-75">
                    {analysis.score >= 80
                      ? "Excellent!"
                      : analysis.score >= 60
                      ? "Good!"
                      : analysis.score >= 40
                      ? "Fair"
                      : "Needs Work"}
                  </div>
                </div>
              </div>
            </div>

            {/* Languages and Stats Row */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Languages Pie Chart */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-6 lg:p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                <h3 className="text-xl lg:text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 lg:mb-6 flex items-center gap-3">
                  <Code className="w-8 h-8" />
                  Top 5 Languages
                </h3>

                <div className="h-64 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1000}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{
                          paddingTop: "20px",
                          fontSize: "14px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* GitHub Stats */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-6 lg:p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                <h3 className="text-xl lg:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 lg:mb-6 flex items-center gap-3">
                  <BarChart2 className="w-8 h-8" />
                  GitHub Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {/* Most Used Language */}
                  <div className="bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-4 lg:p-6 text-center border border-cyan-200/50 dark:border-cyan-800/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                      {userData.mostUsedLanguage}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center gap-1">
                      <FileCode className="w-4 h-4" />
                      Top Language
                    </div>
                  </div>

                  {/* Total Stars */}
                  <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 lg:p-6 text-center border border-indigo-200/50 dark:border-indigo-800/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      {userData.totalStars.toLocaleString()}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center gap-1">
                      <Star className="w-4 h-4" />
                      Total Stars
                    </div>
                  </div>

                  {/* Total PRs */}
                  <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 lg:p-6 text-center border border-blue-200/50 dark:border-blue-800/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {userData.totalPRs.toLocaleString()}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center gap-1">
                      <GitPullRequest className="w-4 h-4" />
                      Pull Requests
                    </div>
                  </div>

                  {/* Total Issues */}
                  <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 lg:p-6 text-center border border-purple-200/50 dark:border-purple-800/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {userData.totalIssues.toLocaleString()}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center gap-1">
                      <Bug className="w-4 h-4" />
                      Issues Created
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Good and Bad Points Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Good Points */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8" />
                  Strengths
                </h3>
                <div className="space-y-4">
                  {analysis.good.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/20 transition-all duration-300 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20"
                    >
                      <span className="text-emerald-500 text-xl mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bad Points */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8" />
                  Areas for Improvement
                </h3>
                <div className="space-y-4">
                  {analysis.bad.length > 0 ? (
                    analysis.bad.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-3 rounded-lg bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20 transition-all duration-300 hover:bg-red-100/50 dark:hover:bg-red-900/20"
                      >
                        <span className="text-red-500 text-xl mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {point}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center bg-green-50/50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/20">
                      <span className="text-4xl mb-2 block">🎉</span>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Excellent! No major issues found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Improvements Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-8 transform transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8" />
                Growth Opportunities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysis.insights.map((improvement, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-cyan-50/80 to-indigo-50/80 dark:from-cyan-900/20 dark:to-indigo-900/20 rounded-xl border border-cyan-200/50 dark:border-cyan-800/20 hover:from-cyan-100/80 hover:to-indigo-100/80 dark:hover:from-cyan-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer group"
                  >
                    <p className="text-cyan-800 dark:text-cyan-300 leading-relaxed group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300">
                      {improvement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
