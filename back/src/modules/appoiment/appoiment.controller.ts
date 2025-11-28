import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoimentService } from './appoiment.service';
import { CreateAppoimentDto, DataAppointmentCreate } from './dto/create-appoiment.dto';
import { UpdateAppoimentDto, UpdateAppoimentServicePartDto } from './dto/update-appoiment.dto';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';

@Controller('appoiment')
export class AppoimentController {
  constructor(private readonly appoimentService: AppoimentService) { }

  @Post()
  async create(@Body() createAppoimentDto: DataAppointmentCreate): Promise<successfulResponse> {
    const appoiment = await this.appoimentService.create(createAppoimentDto)
    return apiResponse(200, 'Cita creada correctamente', appoiment)
  }

  @Get()
  async findAll(): Promise<successfulResponse> {
    const allAppoiments = await this.appoimentService.findAll()
    return apiResponse(200, 'Lista de citas', allAppoiments)
  }

  @Get('appoiment-client/:id')
  async getAllAppoimentClient(@Param('id') id: string): Promise<successfulResponse> {
    const appoiment = await this.appoimentService.findAllAppoimentClient(+id)
    return apiResponse(200, 'Lista de citas obtenidas', appoiment)
  }

  @Get('appoiment-mechanic/:id')
  async getAllAppoimentMechanic(@Param('id') id: string): Promise<successfulResponse> {
    const appoiment = await this.appoimentService.findAllApoimentMechanic(+id)
    return apiResponse(200, 'Lista de citas obtenidas', appoiment)
  }

  @Get('services-appointment/:id_appointment')
  async getAllServicesPartsAppointment(@Param('id_appointment') id:string):Promise<successfulResponse>{
    const servicesParts = await this.appoimentService.getServicesPartAppointment(+id)
    return apiResponse(200, 'Servicios y piezas de la cita obtenidas', servicesParts)
  }

  @Post('dates-available')
  async getDatesAvailable(@Body() durationStimated: {duration:number}): Promise<successfulResponse> {
    const dates = await this.appoimentService.setAppointmentDate(new Date(), durationStimated.duration)
    return apiResponse(200, 'Lista de fechas posibles', dates)

  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<successfulResponse> {
    const appoiment = await this.appoimentService.findOne(+id)
    return apiResponse(200, 'Cita obtenida correctamente', appoiment)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAppoimentDto: UpdateAppoimentDto): Promise<successfulResponse> {
    const updated = await this.appoimentService.update(+id, updateAppoimentDto)
    return apiResponse(200, 'Cita actualizada correctamente', updated)
  }

  @Patch('update-part-appointment/:id')
  async updateAppointmentPart(@Param('id') id:string, @Body() data:UpdateAppoimentServicePartDto):Promise<successfulResponse>{
    const resp = await this.appoimentService.updatePartServiceAppointment(+id, data)
    return apiResponse(200, 'Pieza actualizada', resp)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<successfulResponse> {
    await this.appoimentService.remove(+id)
    return apiResponse(200, 'Cita eliminada correctamente')
  }
}
