import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartsTypeServiceService } from './parts-type-service.service';
import { CreatePartsTypeServiceDto } from './dto/create-parts-type-service.dto';
import { UpdatePartsTypeServiceDto } from './dto/update-parts-type-service.dto';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';

@Controller('parts-type-service')
export class PartsTypeServiceController {
  constructor(private readonly partsTypeServiceService: PartsTypeServiceService) {}

  @Post()
  async create(@Body() createPartsTypeServiceDto: CreatePartsTypeServiceDto) :Promise<successfulResponse>{
    const part = await this.partsTypeServiceService.createPartTypeService(createPartsTypeServiceDto);
    return apiResponse(200, 'Pieza añadida al servicio', part)
  }

  @Get('getAllPartTypeService/:id')
  async findAll(@Param('id') id:string):Promise<successfulResponse> {
    const allPartTypeService = await this.partsTypeServiceService.getAllPartTypeService(+id);
    return apiResponse(200,'Obtenida piezas del servicio', allPartTypeService)
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
}
