import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Car } from '@prisma/client';
import { UserService } from '../user/user.service';
@Injectable()
export class CarsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService:UserService
  ) { }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const owner = await this.userService.getUser(createCarDto.ownerId)
    if(!owner) throw new NotFoundException('El dueño del coche no existe en nuestra base de datos')
    const newCar = await this.prisma.car.create({data: createCarDto})
    return newCar
  }

  async findAll():Promise<Car[]> {
    const allCars = await this.prisma.car.findMany()
    return allCars
  }

  async findOne(id: number):Promise<Car> {
    const car = await this.prisma.car.findFirst({where: {id}})
    if(!car) throw new NotFoundException('Coche no encontrado')
    return car
  }

  async update(id: number, updateCarDto: UpdateCarDto):Promise<Car> {
    if(!updateCarDto) throw new NotFoundException('Coche no encontrado')
    const updateCar = await this.prisma.car.update({
      where: {id},
      data: updateCarDto
    })
    return updateCar
  }

  async remove(id: number) {
    const car = await this.prisma.car.findFirst({where: {id}})
    if(!car) throw new NotFoundException('Coche no encontrado')
    await this.prisma.car.delete({where: {id}})
    return 'Coche eliminado';
  }

  async getAllCarsUser (id:number):Promise<Car[]> {
    const user = await this.prisma.user.findUnique({where: {id}})
    if(!user) throw new NotFoundException('Usuario no encontrado')
    
    const allCarsUser = await this.prisma.car.findMany({where: {ownerId: id}})
    return allCarsUser
    
  }
}
