import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Parts } from '@prisma/client';

@Injectable()
export class PartsService {

  constructor(private prisma:PrismaService){}

  async create(createPartDto: CreatePartDto): Promise<Parts> {
    const createPart = await this.prisma.parts.create({data : createPartDto }) 
    return createPart
  }

  async findAll():Promise<Parts[]> {
    const allPart = await this.prisma.parts.findMany()
    return allPart
  }

  async findOne(id: number):Promise<Parts> {
    const part = await this.prisma.parts.findUnique({where: {id}})
    if(!part) throw new NotFoundException('No se a encontrado la pieza')
    return part
  }

  async update(id: number, updatePartDto: UpdatePartDto):Promise<Parts> {
    await this.findOne(id)
    const partUpdate = await this.prisma.parts.update({
      where: {id: id},
      data: updatePartDto
    })
    return partUpdate
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.parts.delete({where: {id}})
  }

  
}
