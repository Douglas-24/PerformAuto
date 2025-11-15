import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartsTypeServiceDto } from './dto/create-parts-type-service.dto';
import { UpdatePartsTypeServiceDto } from './dto/update-parts-type-service.dto';
import { PartsTypeService } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartsTypeServiceService {

  constructor(private prisma:PrismaService){}

  async findOne(id: number):Promise<PartsTypeService> {
    const partTypeService =  await this.prisma.partsTypeService.findUnique({where:{id}})
    if(!partTypeService) throw new NotFoundException("No se a encontrado la pieza en el servicio")
    return partTypeService
  }

  async update(id: number, updatePartsTypeServiceDto: UpdatePartsTypeServiceDto) {
    const part = await this.prisma.parts.findUnique({where: {id: updatePartsTypeServiceDto.partId}})
    if(!part) throw new NotFoundException("Pieza no encontrada")
    const typeService = await this.prisma.type_Service.findUnique({where: {id: updatePartsTypeServiceDto.typeServiceId}})
    if(!typeService) throw new NotFoundException('Tipo de servicio no encontrado')
    const updatePart = await this.prisma.partsTypeService.update({
      where:{id},
      data: updatePartsTypeServiceDto
    })
    return updatePart
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.partsTypeService.delete({where: { id: id}})
  }

  async createPartTypeService(createPartTypeService: CreatePartsTypeServiceDto):Promise<PartsTypeService>{
    
    const part = await this.prisma.parts.findUnique({where: {id: createPartTypeService.partId}})
    if(!part) throw new NotFoundException("Pieza no encontrada")
    const typeService = await this.prisma.type_Service.findUnique({where: {id: createPartTypeService.typeServiceId}})
    if(!typeService) throw new NotFoundException('Tipo de servicio no encontrado')
    const partTypeService = await this.prisma.partsTypeService.create({data: createPartTypeService})
    return partTypeService
  }

  async getAllPartTypeService(idTypeService:number){
    const allPart = await this.prisma.partsTypeService.findMany({
      where: {typeServiceId: idTypeService},
      include: {
        part: true
      }
    })
    return allPart
  }
}
