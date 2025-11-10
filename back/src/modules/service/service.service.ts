import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { apiResponse } from 'src/core/utils/apiResponse';
import { Service } from '@prisma/client';
@Injectable()
export class ServiceService {
  constructor(
          private readonly prisma: PrismaService,
      ) { }
  async create(createServiceDto: CreateServiceDto):Promise<Service> {
    const service = await this.prisma.service.create({data: createServiceDto})
    return service
  }

  async findAll():Promise<Service[]> {
    const allService = await this.prisma.service.findMany()
    return allService
  }

  async findOne(id: number):Promise<Service> {
    const service = await this.prisma.service.findUnique({where: {id}})
    if(!service) throw new NotFoundException('Servicio no encontrado')
    return service
  }

  async update(id: number, updateServiceDto: UpdateServiceDto):Promise<Service> {
    const service = await this.findOne(id)
    const updateService = await this.prisma.service.update({
      where: {id:id},
      data: updateServiceDto
    })
    return updateService
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.service.delete({where: {id:id}})
  }
}
