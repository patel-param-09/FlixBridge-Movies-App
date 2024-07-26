-- CreateTable
CREATE TABLE `movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie` VARCHAR(191) NOT NULL,
    `rating` DECIMAL(65, 30) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `imdb_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
