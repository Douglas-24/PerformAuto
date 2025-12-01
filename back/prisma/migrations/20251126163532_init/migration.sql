/*
  Warnings:

  - You are about to alter the column `duration` on the `service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `appoimentservicepart` ADD COLUMN `statePart` ENUM('SHOULD_CHANGE', 'REVIEW', 'NO_CHANGE', 'REVISED', 'CHANGED') NOT NULL DEFAULT 'SHOULD_CHANGE';

-- AlterTable
ALTER TABLE `service` MODIFY `duration` INTEGER NOT NULL;
