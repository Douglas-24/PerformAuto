import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceWorkshopService } from './service-workshop.service';
import { CreateServiceWorkshopDto } from './dto/create-service-workshop.dto';
import { UpdateServiceWorkshopDto } from './dto/update-service-workshop.dto';
import { apiResponse } from 'src/core/utils/apiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
interface PartDataForService {
  partId: number;
  quantity: number;
  changeRecomended: boolean;
}
@Controller('service-workshop')
export class ServiceWorkshopController {
  constructor(private readonly serviceWorkshopService: ServiceWorkshopService) {}

  @Post()
  async create(@Body() createServiceWorkshopDto: CreateServiceWorkshopDto): Promise<successfulResponse> {
    const service = await this.serviceWorkshopService.create(createServiceWorkshopDto)
    return apiResponse(200, 'Servicio creado', service)
  }
  @Post('add-part-service/:id')
  async addPartToService(@Param('id') id:string, @Body() parts:PartDataForService): Promise<successfulResponse> {
    const service = await this.serviceWorkshopService.aggregatePartToService(+id, parts)
    return apiResponse(200, 'Piezas añadidas al servicio', service)
  }
  @Delete('remove-part-service/:id_service/:id_part')
  async removePartToService(@Param('id_service') id_service:string, @Param('id_part') id_part:string): Promise<successfulResponse> {
    const service = await this.serviceWorkshopService.removePartToService(+id_service, +id_part)
    return apiResponse(200, 'Piezas añadidas al servicio', service)
  }

  @Get()
  async findAll(): Promise<successfulResponse> {
    const services = await this.serviceWorkshopService.findAll()
    return apiResponse(200, 'Lista de servicios obtenida', services)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<successfulResponse> {
    const service = await this.serviceWorkshopService.findOne(+id)
    return apiResponse(200, 'Servicio obtenido', service)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceWorkshopDto: UpdateServiceWorkshopDto ): Promise<successfulResponse> {
    const updated = await this.serviceWorkshopService.update(+id, updateServiceWorkshopDto)
    return apiResponse(200, 'Servicio actualizado', updated)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<successfulResponse> {
    await this.serviceWorkshopService.remove(+id)
    return apiResponse(200, 'Servicio eliminado')
  }
}
