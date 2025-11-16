/*
  Warnings:

  - You are about to drop the `partstypeservice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `partstypeservice` DROP FOREIGN KEY `PartsTypeService_partId_fkey`;

-- DropForeignKey
ALTER TABLE `partstypeservice` DROP FOREIGN KEY `PartsTypeService_typeServiceId_fkey`;

-- DropTable
DROP TABLE `partstypeservice`;

-- CreateTable
CREATE TABLE `PartsService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partId` INTEGER NOT NULL,
    `typeServiceId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `changeRecomended` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PartsService` ADD CONSTRAINT `PartsService_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsService` ADD CONSTRAINT `PartsService_typeServiceId_fkey` FOREIGN KEY (`typeServiceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
