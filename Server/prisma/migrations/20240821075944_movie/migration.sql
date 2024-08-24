/*
  Warnings:

  - You are about to drop the column `movieImg` on the `watchlatermovies` table. All the data in the column will be lost.
  - You are about to drop the column `movieName` on the `watchlatermovies` table. All the data in the column will be lost.
  - Added the required column `image` to the `watchLaterMovies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie` to the `watchLaterMovies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watchlatermovies` DROP COLUMN `movieImg`,
    DROP COLUMN `movieName`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `movie` VARCHAR(191) NOT NULL;
