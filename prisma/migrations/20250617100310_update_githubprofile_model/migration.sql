-- AlterTable
ALTER TABLE "GithubProfile" ADD COLUMN     "topLanguages" JSONB,
ADD COLUMN     "totalCommits" INTEGER,
ADD COLUMN     "totalIssues" INTEGER,
ADD COLUMN     "totalPRs" INTEGER,
ADD COLUMN     "totalStars" INTEGER;
