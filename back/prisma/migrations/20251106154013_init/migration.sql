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
    `rol` ENUM('CLIENT', 'ADMIN', 'CUSTOMER_SERVICE', 'WAREHOUSE_MANAGER', 'MECHANIC') NOT NULL DEFAULT 'CLIENT',
    `account_verified` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_dni_key`(`dni`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_number_key`(`phone_number`),
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
    `last_revision` DATETIME(3) NOT NULL,
    `current_mileage` INTEGER NOT NULL,
    `engine` VARCHAR(191) NOT NULL,
    `ownerId` INTEGER NOT NULL,

    UNIQUE INDEX `Car_enrolment_key`(`enrolment`),
    UNIQUE INDEX `Car_chassis_number_key`(`chassis_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
