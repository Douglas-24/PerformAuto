import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTypeServices() {
  await prisma.service.createMany({
    data: [
      {
        name: 'Cambio de aceite',
        description: 'Reemplazo de aceite y filtro de motor',
        price: 49,
        frequency_km: 15000,
        frequency_time: '12 meses',
        duration: '1 hora'
      },
      {
        name: 'Revisión de frenos',
        description: 'Inspección y ajuste de frenos, cambio de pastillas si es necesario',
        price: 59,
        frequency_km: 20000,
        frequency_time: '18 meses',
        duration: '2 horas'
      },
      {
        name: 'Alineación de dirección',
        description: 'Ajuste de ángulos de dirección y suspensión',
        price: 39,
        frequency_km: 10000,
        frequency_time: '12 meses',
        duration: '3 horas'
      },
      {
        name: 'Cambio de filtro de aire',
        description: 'Sustitución del filtro de aire del motor',
        price: 25,
        frequency_km: 15000,
        frequency_time: '12 meses',
        duration: '20 min'
      },
      {
        name: 'Cambio de batería',
        description: 'Sustitución de batería por desgaste o fallo',
        price: 89,
        frequency_km: 60000,
        frequency_time: '36 meses',
        duration: '20 min'
      },
      {
        name: 'Revisión general',
        description: 'Chequeo completo del vehículo: líquidos, luces, neumáticos, etc.',
        price: 69,
        frequency_km: 10000,
        frequency_time: '6 meses',
        duration: '5 horas'
      },
    ],
  });

  console.log('🛠️ Tipos de servicio insertados correctamente');
}
