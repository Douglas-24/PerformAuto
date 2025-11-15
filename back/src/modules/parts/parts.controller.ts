import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { apiResponse } from 'src/core/utils/apiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Role } from '@prisma/client';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  async create(@Body() createPartDto: CreatePartDto):Promise<successfulResponse> {
    const part =  this.partsService.create(createPartDto);
    return apiResponse(200, 'Pieza creada', part)
  }

  @Get()
  async findAll():Promise<successfulResponse> {
    const allPart = this.partsService.findAll();
    return  apiResponse(200, 'Lista de piezas obtenida', allPart)
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const part =  this.partsService.findOne(+id);
    return apiResponse(200, 'Pieza obtenida', part)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto):Promise<successfulResponse> {
    const part = this.partsService.update(+id, updatePartDto);
    return apiResponse(200, 'Pieza actualizada', part)
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse> {
    await this.partsService.remove(+id);
    return apiResponse(200, 'Pieza eliminada')
  }

  // @Get('typePart/allPart')
  // async getAllPartTypeService(@Param('idTypeService') idTypeService:string){
  //   const allPart = await this.partsService.getAllPartTypeService(+idTypeService)
  // }
}
