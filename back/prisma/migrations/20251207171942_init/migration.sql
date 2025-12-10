/*
  Warnings:

  - You are about to drop the `partchangeconfirmation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `partchangeconfirmation` DROP FOREIGN KEY `PartChangeConfirmation_appoimentServicePartId_fkey`;

-- AlterTable
ALTER TABLE `appoimentservicepart` MODIFY `statePart` ENUM('SHOULD_CHANGE', 'REVIEW', 'NO_CHANGE', 'REVISED', 'CHANGED', 'CHANGE_URGENT') NOT NULL DEFAULT 'SHOULD_CHANGE';

-- DropTable
DROP TABLE `partchangeconfirmation`;

-- CreateTable
CREATE TABLE `PartChangeUrgent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appoimentServicePartId` INTEGER NOT NULL,
    `mechanicMessage` VARCHAR(191) NOT NULL,
    `clientConfirmed` BOOLEAN NULL,
    `confirmedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `urlImg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PartChangeUrgent` ADD CONSTRAINT `PartChangeUrgent_appoimentServicePartId_fkey` FOREIGN KEY (`appoimentServicePartId`) REFERENCES `AppoimentServicePart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
