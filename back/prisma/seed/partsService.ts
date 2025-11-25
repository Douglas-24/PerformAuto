import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedPartsServices() {
  const oilChange = await prisma.service.findFirst({ where: { name: 'Cambio de aceite' } });
  const brakeService = await prisma.service.findFirst({ where: { name: 'Cambio de frenos' } });
  const batteryService = await prisma.service.findFirst({ where: { name: 'Cambio de batería' } });
  const airFilterService = await prisma.service.findFirst({ where: { name: 'Cambio de filtro de aire' } });

  const oil = await prisma.parts.findFirst({ where: { reference: 'ACE-5W30-4L' } });
  const oilFilter = await prisma.parts.findFirst({ where: { reference: 'OIL-FLT-001' } });
  const brakePadsFront = await prisma.parts.findFirst({ where: { reference: 'BRAKE-PADS-FRONT' } });
  const brakePadsRear = await prisma.parts.findFirst({ where: { reference: 'BRAKE-PADS-REAR' } });
  const brakeDiscFront = await prisma.parts.findFirst({ where: { reference: 'BRAKE-DISC-FRONT' } });
  const brakeDiscRear = await prisma.parts.findFirst({ where: { reference: 'BRAKE-DISC-REAR' } });
  const battery = await prisma.parts.findFirst({ where: { reference: 'BAT-60AH-STD' } });
  const airFilter = await prisma.parts.findFirst({ where: { reference: 'AIR-FILT-001' } });

  // Asociaciones
  if (oilChange && oil && oilFilter) {
    await prisma.partsService.createMany({
      data: [
        {
          partId: oil.id,
          typeServiceId: oilChange.id,
          quantity: 1,
          changeRecomended: true,
        },
        {
          partId: oilFilter.id,
          typeServiceId: oilChange.id,
          quantity: 1,
          changeRecomended: true,
        },
      ],
    });
  }

  if (brakeService && brakePadsFront && brakePadsRear && brakeDiscFront && brakeDiscRear) {
    await prisma.partsService.createMany({
      data: [
        {
          partId: brakePadsFront.id,
          typeServiceId: brakeService.id,
          quantity: 2,
          changeRecomended: true,
        },
        {
          partId: brakePadsRear.id,
          typeServiceId: brakeService.id,
          quantity: 2,
          changeRecomended: true,
        },
        {
          partId: brakeDiscFront.id,
          typeServiceId: brakeService.id,
          quantity: 2,
          changeRecomended: false,
        },
        {
          partId: brakeDiscRear.id,
          typeServiceId: brakeService.id,
          quantity: 2,
          changeRecomended: false,
        },
      ],
    });
  }

  if (batteryService && battery) {
    await prisma.partsService.create({
      data: {
        partId: battery.id,
        typeServiceId: batteryService.id,
        quantity: 1,
        changeRecomended: true,
      },
    });
  }

  if (airFilterService && airFilter) {
    await prisma.partsService.create({
      data: {
        partId: airFilter.id,
        typeServiceId: airFilterService.id,
        quantity: 1,
        changeRecomended: true,
      },
    });
  }

  console.log('🔗 Relaciones PartsService insertadas correctamente');
}
