/*
  Warnings:

  - You are about to drop the column `appoimentId` on the `notifications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `Notifications_appoimentId_fkey`;

-- DropIndex
DROP INDEX `Notifications_appoimentId_fkey` ON `notifications`;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `appoimentId`,
    ADD COLUMN `typeNotifycation` ENUM('INFO', 'WARNING', 'URGENT', 'CONFIRMATION') NOT NULL DEFAULT 'INFO';
