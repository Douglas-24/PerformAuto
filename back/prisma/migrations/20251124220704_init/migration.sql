-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone_number` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `rol` ENUM('CLIENT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    `account_verified` BOOLEAN NOT NULL DEFAULT false,
    `date_register` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_dni_key`(`dni`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('CUSTOMER_SERVICE', 'WAREHOUSE_MANAGER', 'MECHANIC') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeWorkingHours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dayOfWeek` INTEGER NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `employeeId` INTEGER NOT NULL,

    UNIQUE INDEX `EmployeeWorkingHours_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `enrolment` VARCHAR(191) NOT NULL,
    `chassis_number` VARCHAR(191) NOT NULL,
    `last_revision` DATETIME(3) NULL,
    `current_mileage` INTEGER NOT NULL,
    `engine` VARCHAR(191) NOT NULL,
    `ownerId` INTEGER NOT NULL,

    UNIQUE INDEX `Car_enrolment_key`(`enrolment`),
    UNIQUE INDEX `Car_chassis_number_key`(`chassis_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `frequency_km` INTEGER NOT NULL,
    `frequency_time` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appoiment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` ENUM('STARTED', 'PENDING', 'CANCELLED', 'FINISH') NOT NULL,
    `clientId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,
    `mechanicId` INTEGER NOT NULL,
    `appoiment_date` DATETIME(3) NOT NULL,
    `mileage_at_delivery` INTEGER NOT NULL DEFAULT 0,
    `duration` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppoimentService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_appoiment` INTEGER NOT NULL,
    `id_service` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `frequency_km` INTEGER NOT NULL DEFAULT 0,
    `frequency_time` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartsService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partId` INTEGER NOT NULL,
    `typeServiceId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `changeRecomended` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppoimentServicePart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appoimentServiceId` INTEGER NOT NULL,
    `partId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `replaced` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_appoiment` INTEGER NOT NULL,
    `total_cost` INTEGER NOT NULL,
    `date_entered` DATETIME(3) NOT NULL,
    `departure_date` DATETIME(3) NOT NULL,
    `state` ENUM('PAID', 'PENDING', 'CANCELLED') NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployeeWorkingHours` ADD CONSTRAINT `EmployeeWorkingHours_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appoiment` ADD CONSTRAINT `Appoiment_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appoiment` ADD CONSTRAINT `Appoiment_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appoiment` ADD CONSTRAINT `Appoiment_mechanicId_fkey` FOREIGN KEY (`mechanicId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentService` ADD CONSTRAINT `AppoimentService_id_appoiment_fkey` FOREIGN KEY (`id_appoiment`) REFERENCES `Appoiment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentService` ADD CONSTRAINT `AppoimentService_id_service_fkey` FOREIGN KEY (`id_service`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsService` ADD CONSTRAINT `PartsService_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartsService` ADD CONSTRAINT `PartsService_typeServiceId_fkey` FOREIGN KEY (`typeServiceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentServicePart` ADD CONSTRAINT `AppoimentServicePart_appoimentServiceId_fkey` FOREIGN KEY (`appoimentServiceId`) REFERENCES `AppoimentService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppoimentServicePart` ADD CONSTRAINT `AppoimentServicePart_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_id_appoiment_fkey` FOREIGN KEY (`id_appoiment`) REFERENCES `Appoiment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
