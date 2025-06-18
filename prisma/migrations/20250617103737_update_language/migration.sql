/*
  Warnings:

  - You are about to drop the column `totalCommits` on the `GithubProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GithubProfile" DROP COLUMN "totalCommits",
ADD COLUMN     "mostUsedLanguage" TEXT;
