/*
  Warnings:

  - You are about to drop the column `carId` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `mechanicId` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `total_cost` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `typeServiceId` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `partsservice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type_service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency_km` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency_time` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_register` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `partsservice` DROP FOREIGN KEY `PartsService_partId_fkey`;

-- DropForeignKey
ALTER TABLE `partsservice` DROP FOREIGN KEY `PartsService_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `partstypeservice` DROP FOREIGN KEY `PartsTypeService_typeServiceId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_carId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_mechanicId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_typeServiceId_fkey`;

-- DropIndex
DROP INDEX `PartsTypeService_typeServiceId_fkey` ON `partstypeservice`;

-- DropIndex
DROP INDEX `Service_carId_fkey` ON `service`;

-- DropIndex
DROP INDEX `Service_clientId_fkey` ON `service`;

-- DropIndex
DROP INDEX `Service_mechanicId_fkey` ON `service`;

-- DropIndex
DROP INDEX `Service_typeServiceId_fkey` ON `service`;

-- AlterTable
ALTER TABLE `parts` ADD COLUMN `frequency_km` INTEGER NULL,
    ADD COLUMN `frequency_time` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `carId`,
    DROP COLUMN `clientId`,
    DROP COLUMN `mechanicId`,
    DROP COLUMN `state`,
    DROP COLUMN `total_cost`,
    DROP COLUMN `typeServiceId`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `frequency_km` INTEGER NOT NULL,
    ADD COLUMN `frequency_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `date_register` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `partsservice`;

-- DropTable
DROP TABLE `type_service`;

-- CreateTable
CREATE TABLE `Appoiment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` ENUM('STARTED', 'PENDING', 'CANCELLED', 'FINISH') NOT NULL,
    `clientId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,
    `mechanicId` INTEGER NOT NULL,
    `appoiment_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppoimentService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_appoiment` INTEGER NOT NULL,
    `id_service` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_appoiment` INTEGER NOT NULL,
    `total_cost` INTEGER NOT NULL,
    `date_entered` DATETIME(3) NOT NULL,
    `departure_date` DATETIME(3) NOT NULL,
    `state` ENUM('PAID', 'PENDING', 'CANCELLED') NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appoiment` ADD CONSTRAINT `Appoiment_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appoiment` ADD CONSTRAINT `Appoiment_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appoiment` ADD CONSTRAINT `Appoiment_mechanicId_fkey` FOREIGN KEY (`mechanicId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentService` ADD CONSTRAINT `AppoimentService_id_appoiment_fkey` FOREIGN KEY (`id_appoiment`) REFERENCES `Appoiment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentService` ADD CONSTRAINT `AppoimentService_id_service_fkey` FOREIGN KEY (`id_service`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsTypeService` ADD CONSTRAINT `PartsTypeService_typeServiceId_fkey` FOREIGN KEY (`typeServiceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_id_appoiment_fkey` FOREIGN KEY (`id_appoiment`) REFERENCES `Appoiment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
