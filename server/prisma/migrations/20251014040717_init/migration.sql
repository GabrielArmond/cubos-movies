/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "genres" TEXT[],
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "popularity" INTEGER NOT NULL,
    "poster_path" TEXT NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "profit" INTEGER NOT NULL,
    "trailer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
