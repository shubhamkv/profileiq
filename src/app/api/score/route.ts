import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { calculateGithubScore } from "../../../../lib/score";
import { getGitHubProfileStats } from "../../../../lib/github";

export async function POST(req: NextRequest) {
  try {
    const { name, email, username } = await req.json();

    const result = await calculateGithubScore(username);
    const githubStats = await getGitHubProfileStats(username);

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { name, email },
      });
    }

    const githubProfile = await prisma.githubProfile.create({
      data: {
        login: result.profile.login,
        name: result.profile.name,
        avatar_url: result.profile.avatar_url,
        bio: result.profile.bio,
        blog: result.profile.blog,
        location: result.profile.location,
        public_repos: result.profile.public_repos,
        followers: result.profile.followers,
        following: result.profile.following,
        totalStars: githubStats.totalStars,
        mostUsedLanguage: githubStats.mostUsedLanguage,
        totalPRs: githubStats.totalPRs,
        totalIssues: githubStats.totalIssues,
        topLanguages: githubStats.topLanguages,
      },
    });

    const saved = await prisma.githubScore.create({
      data: {
        userId: user.id,
        score: result.score,
        good: result.good,
        bad: result.bad,
        insights: result.insights,
        profileId: githubProfile.id,
      },
    });

    return NextResponse.json({
      score: saved.score,
      good: saved.good,
      bad: saved.bad,
      insights: saved.insights,
      profile: result.profile,
      githubStats,
    });
  } catch (err: any) {
    console.error("Score generation failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
