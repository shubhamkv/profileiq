/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `GithubScore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `GithubScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubScore" ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GithubProfile" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "bio" TEXT,
    "blog" TEXT,
    "location" TEXT,
    "public_repos" INTEGER,
    "followers" INTEGER,
    "following" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubScore_profileId_key" ON "GithubScore"("profileId");

-- AddForeignKey
ALTER TABLE "GithubScore" ADD CONSTRAINT "GithubScore_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "GithubProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
