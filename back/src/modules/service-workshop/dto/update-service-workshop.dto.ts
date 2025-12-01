import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceWorkshopDto } from './create-service-workshop.dto';

export class UpdateServiceWorkshopDto extends PartialType(CreateServiceWorkshopDto) {}
