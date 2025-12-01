import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedParts() {
  await prisma.parts.createMany({
    data: [
      {
        name: 'Aceite 5W30',
        reference: 'ACE-5W30-4L',
        price: 40, // Precio por 4L
        stock: 20,
        frequency_km: 10000,
        frequency_time: '12 meses',
      },
      {
        name: 'Filtro de aceite',
        reference: 'OIL-FLT-001',
        price: 15,
        stock: 50,
        frequency_km: 10000,
        frequency_time: '12 meses',
      },
      {
        name: 'Pastillas de freno delanteras',
        reference: 'BRAKE-PADS-FRONT',
        price: 35,
        stock: 80,
        frequency_km: 30000,
        frequency_time: '24 meses',
      },
      {
        name: 'Pastillas de freno traseras',
        reference: 'BRAKE-PADS-REAR',
        price: 30,
        stock: 70,
        frequency_km: 30000,
        frequency_time: '24 meses',
      },
      {
        name: 'Disco de freno delantero',
        reference: 'BRAKE-DISC-FRONT',
        price: 60,
        stock: 40,
        frequency_km: 60000,
        frequency_time: '48 meses',
      },
      {
        name: 'Disco de freno trasero',
        reference: 'BRAKE-DISC-REAR',
        price: 55,
        stock: 35,
        frequency_km: 60000,
        frequency_time: '48 meses',
      },
      {
        name: 'Filtro de aire',
        reference: 'AIR-FILT-001',
        price: 20,
        stock: 60,
        frequency_km: 15000,
        frequency_time: '12 meses',
      },
      {
        name: 'Batería 60Ah',
        reference: 'BAT-60AH-STD',
        price: 89,
        stock: 25,
        frequency_km: 0,
        frequency_time: '48 meses',
      },
      {
        name: 'Líquido de frenos DOT4',
        reference: 'BRAKE-FLUID-DOT4',
        price: 10,
        stock: 100,
        frequency_km: 20000,
        frequency_time: '24 meses',
      },
      {
        name: 'Líquido refrigerante',
        reference: 'COOLANT-RED-5L',
        price: 18,
        stock: 40,
        frequency_km: 30000,
        frequency_time: '24 meses',
      },
      {
        name: 'Líquido limpiaparabrisas',
        reference: 'WINDSHIELD-FLUID',
        price: 6,
        stock: 100,
        frequency_km: 0,
        frequency_time: '6 meses',
      },
      {
        name: 'Bombilla H7',
        reference: 'BULB-H7-STD',
        price: 8,
        stock: 200,
        frequency_km: 0,
        frequency_time: '24 meses',
      },
    ],
  });

  console.log('🛠️ Piezas insertadas correctamente');
}
