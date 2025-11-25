import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedEmployee() {
    // Generar hash de contraseña por defecto
    const password = await bcrypt.hash('Alvaro1@', 10);

    // Crear empleados con sus horarios
    const employees = await prisma.employee.createMany({
        data: [
            {
                name: 'Ana',
                lastname: 'García',
                email: 'ana.garcia@example.com',
                password,
                rol: 'CUSTOMER_SERVICE',
                isActive: true,
            },
            {
                name: 'Luis',
                lastname: 'Martínez',
                email: 'luis.martinez@example.com',
                password,
                rol: 'WAREHOUSE_MANAGER',
                isActive: true,
            },
            {
                name: 'Carlos',
                lastname: 'Fernández',
                email: 'carlos.fernandez@example.com',
                password,
                rol: 'MECHANIC',
                isActive: true,
            },
            {
                name: 'Pedro',
                lastname: 'López',
                email: 'pedro.lopez@example.com',
                password,
                rol: 'MECHANIC',
                isActive: true,
            },
            {
                name: 'María',
                lastname: 'Ruiz',
                email: 'maria.ruiz@example.com',
                password,
                rol: 'MECHANIC',
                isActive: true,
            },
        ],
    });

    // Buscar empleados creados
    const ana = await prisma.employee.findFirst({ where: { email: "ana.garcia@example.com" } });
    const luis = await prisma.employee.findFirst({ where: { email: 'luis.martinez@example.com' } });
    const carlos = await prisma.employee.findFirst({ where: { email: 'carlos.fernandez@example.com' } });
    const pedro = await prisma.employee.findFirst({ where: { email: 'pedro.lopez@example.com' } });
    const maria = await prisma.employee.findFirst({ where: { email: 'maria.ruiz@example.com' } });
    // Crear horarios asociados (1:1)
    if (ana) {
        await prisma.employeeWorkingHours.create({
            data: {
                dayOfWeek: 1,
                startTime: '09:00',
                endTime: '17:00',
                employeeId: ana.id,
            },
        });
    }

    if (luis) {
        await prisma.employeeWorkingHours.create({
            data: {
                dayOfWeek: 2,
                startTime: '08:00',
                endTime: '16:00',
                employeeId: luis.id,
            },
        });
    }

    if (carlos) {
        await prisma.employeeWorkingHours.create({
            data: {
                dayOfWeek: 3,
                startTime: '10:00',
                endTime: '18:00',
                employeeId: carlos.id,
            },
        });
    }

    if (pedro) {
        await prisma.employeeWorkingHours.create({
            data: {
                dayOfWeek: 4,
                startTime: '07:00',
                endTime: '15:00',
                employeeId: pedro.id,
            },
        });
    }

    if (maria) {
        await prisma.employeeWorkingHours.create({
            data: {
                dayOfWeek: 5,
                startTime: '11:00',
                endTime: '19:00',
                employeeId: maria.id,
            },
        });
    }

    console.log('Empleados insertados correctamente 🚀');
}