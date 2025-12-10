/*
  Warnings:

  - You are about to drop the column `date_entered` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `departure_date` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the `notificationfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notificationfile` DROP FOREIGN KEY `NotificationFile_notificationId_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `date_entered`,
    DROP COLUMN `departure_date`,
    DROP COLUMN `state`,
    ADD COLUMN `date_invoice_issuance` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `notificationfile`;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
