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

    UNIQUE INDEX `User_dni_key`(`dni`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_number_key`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
