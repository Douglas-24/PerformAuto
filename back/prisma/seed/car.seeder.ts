import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedCars() {
  const clientes = await prisma.user.findMany({
    where: { rol: Role.CLIENT },
  });

  if (clientes.length === 0) {
    console.warn('⚠️ No se encontraron usuarios con rol CLIENT');
    return;
  }

  const marcas = ['Seat', 'Renault', 'Ford', 'Peugeot', 'Volkswagen'];
  const modelos = ['Ibiza', 'Clio', 'Focus', '208', 'Golf'];
  const motores = ['1.2 TSI', '1.5 dCi', '1.0 EcoBoost', '1.6 HDi', '2.0 TDI'];

  let cocheCount = 0;

  for (const cliente of clientes) {
    for (let i = 0; i < 3; i++) {
      const index = (cocheCount + i) % marcas.length;

      await prisma.car.create({
        data: {
          photo: `https://example.com/images/car4.jpg`,
          brand: marcas[index],
          model: modelos[index],
          enrolment: `ABC${cocheCount + 1000}`,
          chassis_number: `CHS${cocheCount + 100000}`,
          last_revision: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365),
          current_mileage: 30000 + Math.floor(Math.random() * 70000),
          engine: motores[index],
          ownerId: cliente.id,
        },
      });

      cocheCount++;
    }
  }

  console.log(`🚗 Se insertaron ${cocheCount} coches para ${clientes.length} clientes`);
}
