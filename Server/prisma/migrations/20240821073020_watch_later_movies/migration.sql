-- CreateTable
CREATE TABLE `watchLaterMovies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `movieName` VARCHAR(191) NOT NULL,
    `movieImg` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `imdb_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
