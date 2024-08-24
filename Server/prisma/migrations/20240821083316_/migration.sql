/*
  Warnings:

  - Added the required column `movie` to the `watchLaterMovies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watchlatermovies` ADD COLUMN `movie` VARCHAR(191) NOT NULL;
