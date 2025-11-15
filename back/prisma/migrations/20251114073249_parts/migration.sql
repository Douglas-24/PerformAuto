-- CreateTable
CREATE TABLE `Parts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartsTypeService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partId` INTEGER NOT NULL,
    `typeServiceId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `changeRecomended` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartsService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceId` INTEGER NOT NULL,
    `partId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PartsTypeService` ADD CONSTRAINT `PartsTypeService_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsTypeService` ADD CONSTRAINT `PartsTypeService_typeServiceId_fkey` FOREIGN KEY (`typeServiceId`) REFERENCES `Type_Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsService` ADD CONSTRAINT `PartsService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsService` ADD CONSTRAINT `PartsService_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
