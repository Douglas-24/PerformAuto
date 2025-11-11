import { seedCars } from "./car.seeder";
import { seedUsers } from "./user.seeder";
import { seedTypeServices } from "./type-service.seeder";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await seedUsers()
    await seedCars()
    await seedTypeServices()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })