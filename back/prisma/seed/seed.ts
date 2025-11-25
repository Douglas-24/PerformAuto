import { seedCars } from "./car.seeder";
import { seedUsers } from "./user.seeder";
import { seedServices } from "./type-service.seeder";
import { PrismaClient } from '@prisma/client'
import { seedParts } from "./part.seeder";
import { seedEmployee } from "./employee"
import { seedPartsServices } from "./partsService";
const prisma = new PrismaClient()
async function main() {
    await seedUsers()
    await seedEmployee()
    await seedCars()
    await seedServices()
    await seedParts()
    await seedPartsServices()
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