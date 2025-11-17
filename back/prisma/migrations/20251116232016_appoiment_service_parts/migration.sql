-- CreateTable
CREATE TABLE `AppoimentServicePart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appoimentServiceId` INTEGER NOT NULL,
    `partId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `replaced` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AppoimentServicePart` ADD CONSTRAINT `AppoimentServicePart_appoimentServiceId_fkey` FOREIGN KEY (`appoimentServiceId`) REFERENCES `AppoimentService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentServicePart` ADD CONSTRAINT `AppoimentServicePart_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
