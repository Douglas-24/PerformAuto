import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Public } from 'src/core/decorators/public.decorator';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto):Promise<successfulResponse> {
    const invoice = await this.invoicesService.create(createInvoiceDto);
    return apiResponse(200, 'Factura creada', invoice)
  }
  
  @Get('all-invoice-user/:id')
  async findAllInvoiceUser(@Param('id') id:string):Promise<successfulResponse> {
    const allInvoice = await this.invoicesService.findAllUserInvoice(+id);
    return apiResponse(200, 'Factura creada', allInvoice)
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const invoice = await this.invoicesService.findOneInvoice(+id);
    return apiResponse(200, 'Factura creada', invoice)
  }

}
