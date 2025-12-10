import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceWorkshopDto } from './dto/create-service-workshop.dto';
import { UpdateServiceWorkshopDto } from './dto/update-service-workshop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Service } from '@prisma/client';
interface PartDataForService {
  partId: number;
  quantity: number;
  changeRecomended: boolean;
}
@Injectable()
export class ServiceWorkshopService {

  constructor(private prisma: PrismaService) { }

  async create(createServiceWorkshopDto: CreateServiceWorkshopDto): Promise<Service> {
    const createdService = await this.prisma.service.create({
      data: createServiceWorkshopDto,
    });
    return createdService
  }

  async findAll(): Promise<Service[]> {
    return await this.prisma.service.findMany({
      include:{
        parts: {
          include:{
            part: true
          }
        }
      }
    })
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.prisma.service.findUnique({ where: { id } })
    if (!service) throw new NotFoundException('No se ha encontrado el servicio')
    return service
  }

  async update(id: number, updateServiceWorkshopDto: UpdateServiceWorkshopDto): Promise<Service> {
    await this.findOne(id)
    const updatedService = await this.prisma.service.update({
      where: { id },
      data: updateServiceWorkshopDto
    });
    return updatedService
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.prisma.service.delete({ where: { id } })
  }

  async aggregatePartToService(serviceId: number, partsData: PartDataForService) {
   const result = await this.prisma.partsService.create({
    data: {
      partId:partsData.partId,
      quantity:partsData.quantity,
      typeServiceId:serviceId,
      changeRecomended:true
    }
   })
    return result;
  }

  async removePartToService(serviceId:number, partId:number){
    return await this.prisma.partsService.deleteMany({
      where: {
        partId:partId,
        typeServiceId:serviceId
      }
    })
  }
}
