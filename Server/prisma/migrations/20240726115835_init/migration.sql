/*
  Warnings:

  - You are about to alter the column `rating` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `id` INTEGER NOT NULL,
    MODIFY `rating` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `watchLater` (
    `id` INTEGER NOT NULL,
    `movie` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `imdb_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
