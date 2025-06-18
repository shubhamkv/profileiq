"use client";

import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Award,
  Code,
  Zap,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Analyze Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">
                {" "}
                GitHub Profile
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl font-mono">
              Unlock actionable insights into your GitHub profile. Discover
              strengths, identify gaps, and improve your developer score with
              smart analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => router.push("/analyze")}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <FaGithub className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Analyze Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                  100+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Profiles Analyzed
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Accuracy
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Metrics
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-auto flex items-center space-x-2 text-gray-500 text-sm">
                    <FaGithub className="w-4 h-4" />
                    <span>github.com/shubham</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Shubham Kumar
                      </div>
                      <div className="text-sm text-gray-500">
                        Full Stack Developer
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-cyan-600">127</div>
                      <div className="text-xs text-gray-500">Repos</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-indigo-600">
                        1.2k
                      </div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="text-lg font-bold text-cyan-600">89%</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        TypeScript
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        85%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full shadow-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-indigo-50 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to understand and improve your GitHub profile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-6 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-cyan-200 dark:border-gray-600 hover:shadow-xl hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-12 h-12 text-cyan-500 group-hover:text-indigo-500 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                Detailed Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                Comprehensive analysis of your repositories, commits, and coding
                patterns with detailed insights
              </p>
            </div>

            <div className="group p-6 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-cyan-200 dark:border-gray-600 hover:shadow-xl hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-12 h-12 text-cyan-500 group-hover:text-indigo-500 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                Score & Ranking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                Get scored on multiple parameters and see how you rank among
                developers worldwide
              </p>
            </div>

            <div className="group p-6 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-cyan-200 dark:border-gray-600 hover:shadow-xl hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <Award className="w-12 h-12 text-cyan-500 group-hover:text-indigo-500 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                Improvement Tips
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                Actionable recommendations to enhance your profile and coding
                habits for better visibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple 3-step process to get your GitHub analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Enter Username
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply provide your GitHub username to get started with the
                analysis
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Smart Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system analyzes your profile, repos, and contribution
                patterns in detail
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Get Report
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive detailed insights and improvement recommendations
                instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Improve Your GitHub Profile?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of developers who have enhanced their profiles with
            ProfileIQ's smart insights
          </p>

          <button
            onClick={() => router.push("/analyze")}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl cursor-pointer"
          >
            <FaGithub className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Start Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
}
