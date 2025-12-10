/*
  Warnings:

  - You are about to drop the `partchangeimage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `urlImg` to the `PartChangeConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `partchangeimage` DROP FOREIGN KEY `PartChangeImage_confirmationId_fkey`;

-- AlterTable
ALTER TABLE `partchangeconfirmation` ADD COLUMN `urlImg` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `partchangeimage`;
