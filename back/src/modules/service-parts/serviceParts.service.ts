import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicesPartsDto } from './dto/create-service-parts.dto';
import { UpdatePartsTypeServiceDto } from './dto/update-parts-type-service.dto';
import { PartsService} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ServicesParts {

  constructor(private prisma:PrismaService){}

  async findOne(id: number):Promise<PartsService> {
    const partTypeService =  await this.prisma.partsService.findUnique({where:{id}})
    if(!partTypeService) throw new NotFoundException("No se a encontrado la pieza en el servicio")
    return partTypeService
  }

  async update(id: number, updatePartsTypeServiceDto: UpdatePartsTypeServiceDto) {
    const part = await this.prisma.parts.findUnique({where: {id: updatePartsTypeServiceDto.partId}})
    if(!part) throw new NotFoundException("Pieza no encontrada")
    const typeService = await this.prisma.service.findUnique({where: {id: updatePartsTypeServiceDto.typeServiceId}})
    if(!typeService) throw new NotFoundException('Tipo de servicio no encontrado')
    const updatePart = await this.prisma.partsService.update({
      where:{id},
      data: updatePartsTypeServiceDto
    })
    return updatePart
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.partsService.delete({where: { id: id}})
  }

  async createPartTypeService(createPartTypeService: CreateServicesPartsDto):Promise<PartsService>{
    
    const part = await this.prisma.parts.findUnique({where: {id: createPartTypeService.partId}})
    if(!part) throw new NotFoundException("Pieza no encontrada")
    const typeService = await this.prisma.service.findUnique({where: {id: createPartTypeService.typeServiceId}})
    if(!typeService) throw new NotFoundException('Tipo de servicio no encontrado')
    const partTypeService = await this.prisma.partsService.create({data: createPartTypeService})
    return partTypeService
  }
  async getAllTypeServicesWithParts(){
    const allPart = await this.prisma.service.findMany({
      include: {
        parts: {
          include: {
            part: true
          }
        }
      }
    })
    return allPart
  }

  async getAllPartTypeService(idTypeService:number){
    const allPart = await this.prisma.service.findMany({
      where: {id:idTypeService},
      include: {
        parts: {
          include: {
            part: true
          }
        }
      }
    })
    return allPart
  }  
}
