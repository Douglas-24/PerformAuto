import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeServiceDto } from './dto/create-type_service.dto';
import { UpdateTypeServiceDto } from './dto/update-type_service.dto';
import { apiResponse } from 'src/core/utils/apiResponse';
import { Type_Service } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypeServiceService {
  constructor(
    private readonly prisma:PrismaService
  ){}
  async create(createTypeServiceDto: CreateTypeServiceDto):Promise<Type_Service> {
    const newTpyeSerice = await this.prisma.type_Service.create({data: createTypeServiceDto})
    return newTpyeSerice
  }

  async findAll():Promise<Type_Service[]> {
    const allTypes = await this.prisma.type_Service.findMany()  
    return allTypes
  }

  async findOne(id: number):Promise<Type_Service> {
    const typeService = await this.prisma.type_Service.findUnique({where : {id}})
    if(!typeService) throw new NotFoundException('No se encuentra el tipo de servicio')
      return typeService
  }
  
  async update(id: number, updateTypeServiceDto: UpdateTypeServiceDto):Promise<Type_Service> {
    const typeService = await this.findOne(id)
    const updateTypeService = await this.prisma.type_Service.update({where: {id: id}, data: updateTypeServiceDto})
    return updateTypeService
    
  }

  async remove(id: number) {
    const typeService = await this.findOne(id)
    await this.prisma.type_Service.delete({where: {id:id}})
  }
}
