import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeServiceService } from './type_service.service';
import { CreateTypeServiceDto } from './dto/create-type_service.dto';
import { UpdateTypeServiceDto } from './dto/update-type_service.dto';
import { apiResponse } from 'src/core/utils/apiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/core/guards/role.guard';
@Controller('type-service')
export class TypeServiceController {
  constructor(private readonly typeServiceService: TypeServiceService) {}

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Post()
  async create(@Body() createTypeServiceDto: CreateTypeServiceDto):Promise<successfulResponse> {
    const typeService = await this.typeServiceService.create(createTypeServiceDto);
    return apiResponse(200, 'Tipo de servicio creado correctamente', typeService)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Get()
  async findAll():Promise<successfulResponse>  {
    const typesServices = await this.typeServiceService.findAll();
    return apiResponse(200, 'Tipos de servicios obtenidos correctamente', typesServices)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse>  {
    const typeService = await this.typeServiceService.findOne(+id);
    return apiResponse(200, 'Tipo de servicio obtenido correctamente', typeService)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTypeServiceDto: UpdateTypeServiceDto):Promise<successfulResponse> {
    const typeService = await this.typeServiceService.update(+id, updateTypeServiceDto);
    return apiResponse(200, 'Tipo de servicio actualizado correctamente', typeService)
  }

  @UseGuards(new RoleGuard([Role.ADMIN]))
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse>  {
    await this.typeServiceService.remove(+id);
    return apiResponse(200, 'Tipo de servicio eliminado correctamente')
  }
}
