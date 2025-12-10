/*
  Warnings:

  - You are about to drop the column `confirmed` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `id_employee` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_notificationId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `Notifications_id_employee_fkey`;

-- DropIndex
DROP INDEX `Notifications_id_employee_fkey` ON `notifications`;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `confirmed`,
    DROP COLUMN `id_employee`,
    DROP COLUMN `type`,
    ADD COLUMN `employeeId` INTEGER NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `file`;

-- CreateTable
CREATE TABLE `PartChangeConfirmation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appoimentServicePartId` INTEGER NOT NULL,
    `mechanicMessage` VARCHAR(191) NOT NULL,
    `clientConfirmed` BOOLEAN NULL,
    `confirmedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartChangeImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `confirmationId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notificationId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PartChangeConfirmation` ADD CONSTRAINT `PartChangeConfirmation_appoimentServicePartId_fkey` FOREIGN KEY (`appoimentServicePartId`) REFERENCES `AppoimentServicePart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartChangeImage` ADD CONSTRAINT `PartChangeImage_confirmationId_fkey` FOREIGN KEY (`confirmationId`) REFERENCES `PartChangeConfirmation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationFile` ADD CONSTRAINT `NotificationFile_notificationId_fkey` FOREIGN KEY (`notificationId`) REFERENCES `Notifications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
