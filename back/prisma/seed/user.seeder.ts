import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt'
const prisma = new PrismaClient();

export async function seedUsers() {
    const pass = "alvaro3A2@"
    const hash = await bcrypt.hash(pass, 10);
    await prisma.user.upsert({
        where: { email: 'cliente@example.com' },
        update: {},
        create: {
            name: 'Carlos',
            lastname: 'Gómez',
            dni: '12345678A',
            email: 'cliente@example.com',
            password: hash,
            phone_number: 600111111,
            address: 'Calle Mayor 1',
            postal_code: 13001,
            rol: Role.CLIENT,
            account_verified: true,
            date_register: new Date()
        },
    });

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Lucía',
            lastname: 'Martínez',
            dni: '23456789B',
            email: 'admin@example.com',
            password: hash,
            phone_number: 600222222,
            address: 'Calle Sol 2',
            postal_code: 13002,
            rol: Role.ADMIN,
            account_verified: true,
            date_register: new Date()

        },
    });

    await prisma.user.upsert({
        where: { email: 'atencion@example.com' },
        update: {},
        create: {
            name: 'Javier',
            lastname: 'Ruiz',
            dni: '34567890C',
            email: 'atencion@example.com',
            password: hash,
            phone_number: 600333333,
            address: 'Calle Luna 3',
            postal_code: 13003,
            rol: Role.CLIENT,
            account_verified: true,
            date_register: new Date()

        },
    });

    await prisma.user.upsert({
        where: { email: 'almacen@example.com' },
        update: {},
        create: {
            name: 'Ana',
            lastname: 'Fernández',
            dni: '45678901D',
            email: 'almacen@example.com',
            password: hash,
            phone_number: 600444444,
            address: 'Calle Estrella 4',
            postal_code: 13004,
            rol: Role.ADMIN,
            account_verified: true,
            date_register: new Date()

        },
    });

    await prisma.user.upsert({
        where: { email: 'mecanico@example.com' },
        update: {},
        create: {
            name: 'Miguel',
            lastname: 'Santos',
            dni: '56789012E',
            email: 'mecanico@example.com',
            password: hash,
            phone_number: 600555555,
            address: 'Calle Motor 5',
            postal_code: 13005,
            rol: Role.CLIENT,
            account_verified: true,
            date_register: new Date()

        },
    });

    await prisma.user.upsert({
        where: { email: 'verificado@example.com' },
        update: {},
        create: {
            name: 'Elena',
            lastname: 'Navarro',
            dni: '67890123F',
            email: 'verificado@example.com',
            password: hash,
            phone_number: 600666666,
            address: 'Calle Taller 6',
            postal_code: 13006,
            rol: Role.CLIENT,
            account_verified: false,
            date_register: new Date()

        },
    });

    console.log('✅ Usuarios seed insertados');
}
