/*
  Warnings:

  - You are about to alter the column `last_revision` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `car` MODIFY `last_revision` DATETIME(3) NOT NULL;
