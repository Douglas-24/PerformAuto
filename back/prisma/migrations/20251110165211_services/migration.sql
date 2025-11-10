-- CreateTable
CREATE TABLE `Type_Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `frequency_km` INTEGER NOT NULL,
    `frequency_time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` ENUM('STARTED', 'PENDING', 'FINISH') NOT NULL,
    `total_cost` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,
    `typeServiceId` INTEGER NOT NULL,
    `mechanicId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_typeServiceId_fkey` FOREIGN KEY (`typeServiceId`) REFERENCES `Type_Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_mechanicId_fkey` FOREIGN KEY (`mechanicId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
