import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesParts } from './servicesParts.service';
import { CreateServicesPartsDto } from './dto/create-service-parts.dto';
import { UpdatePartsTypeServiceDto } from './dto/update-parts-type-service.dto';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';
import { DataDto } from './dto/TypeServiceParts.dto';

@Controller('parts-service')
export class ServicePartsController {
  constructor(private readonly partsTypeServiceService: ServicesParts) {}

  @Post()
  async create(@Body() createPartsTypeServiceDto: CreateServicesPartsDto) :Promise<successfulResponse>{
    const part = await this.partsTypeServiceService.createPartTypeService(createPartsTypeServiceDto);
    return apiResponse(200, 'Pieza añadida al servicio', part)
  }

  @Get('getAllPartService/:id')
  async findAll(@Param('id') id:string):Promise<successfulResponse> {
    const allPartTypeService = await this.partsTypeServiceService.getAllPartService(+id);
    return apiResponse(200,'Obtenida piezas del servicio', allPartTypeService)
  }

  @Get('allPartsAndServices')
  async getAllTypesServicesWithParts():Promise<successfulResponse> {
    const allPartTypeService = await this.partsTypeServiceService.getAllTypeServicesWithParts();
    return apiResponse(200,'Obtenida listaa de servicios con sus piezas', allPartTypeService)
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const part = await  this.partsTypeServiceService.findOne(+id);
    return apiResponse(200, 'Pieza y servicio obtenida', part)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePartsTypeServiceDto: UpdatePartsTypeServiceDto):Promise<successfulResponse> {
    const part = await this.partsTypeServiceService.update(+id, updatePartsTypeServiceDto);
    return apiResponse(200, 'Pieza actualizada en el servicio', part)
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse> {
    await this.partsTypeServiceService.remove(+id);
    return apiResponse(200, 'Pieza eliminada del servicio')
  }

  @Post('parts-need-remplaced/:id_service')
  async partsNeedRemplaced(@Param('id_service') id_service:string,@Body() data:DataDto):Promise<successfulResponse>{
    const reps = await this.partsTypeServiceService.needChangeParts(+id_service,data)
    return apiResponse(200, '',reps)
  }
}
