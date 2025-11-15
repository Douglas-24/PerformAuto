import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedParts() {
  await prisma.parts.createMany({
    data: [
      {
        name: 'Aceite 5W30',
        reference: 'ACE-5W30-4L',
        price: 40, // Precio por 4L
      },
      {
        name: 'Filtro de aceite',
        reference: 'FILT-OIL-001',
        price: 15,
      },
      {
        name: 'Pastillas de freno delanteras',
        reference: 'BRAKE-PADS-FRONT',
        price: 35,
      },
      {
        name: 'Pastillas de freno traseras',
        reference: 'BRAKE-PADS-REAR',
        price: 30,
      },
      {
        name: 'Disco de freno delantero',
        reference: 'BRAKE-DISC-FRONT',
        price: 60,
      },
      {
        name: 'Disco de freno trasero',
        reference: 'BRAKE-DISC-REAR',
        price: 55,
      },
      {
        name: 'Filtro de aire',
        reference: 'AIR-FILT-001',
        price: 20,
      },
      {
        name: 'Batería 60Ah',
        reference: 'BAT-60AH-STD',
        price: 89,
      },
      {
        name: 'Líquido de frenos DOT4',
        reference: 'BRAKE-FLUID-DOT4',
        price: 10,
      },
      {
        name: 'Líquido refrigerante',
        reference: 'COOLANT-RED-5L',
        price: 18,
      },
      {
        name: 'Líquido limpiaparabrisas',
        reference: 'WINDSHIELD-FLUID',
        price: 6,
      },
      {
        name: 'Bombilla H7',
        reference: 'BULB-H7-STD',
        price: 8,
      },
    ],
  });
  console.log('🛠️ Piezas insertadas correctamente');
}
