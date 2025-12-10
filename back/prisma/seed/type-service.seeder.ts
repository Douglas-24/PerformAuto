import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedServices() {
  await prisma.service.createMany({
    data: [
      {
        name: 'Cambio de aceite',
        description: 'Cambio de aceite del motor y revisión general',
        price: 50,
        frequency_km: 10000,
        frequency_time: '12 meses',
        duration: 2,
      },
      {
        name: 'Cambio de frenos',
        description: 'Sustitución de pastillas y revisión de discos',
        price: 120,
        frequency_km: 30000,
        frequency_time: '24 meses',
        duration: 3,
      },
      {
        name: 'Cambio de batería',
        description: 'Sustitución de batería estándar de 60Ah',
        price: 100,
        frequency_km: 0,
        frequency_time: '48 meses',
        duration: 1,
      },
      {
        name: 'Cambio de filtro de aire',
        description: 'Sustitución del filtro de aire del motor',
        price: 25,
        frequency_km: 15000,
        frequency_time: '12 meses',
        duration: 1,
      },
    ],
  });

  console.log('⚙️ Servicios insertados correctamente');
}
