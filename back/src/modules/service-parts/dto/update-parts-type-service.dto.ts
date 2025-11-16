import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesPartsDto } from './create-service-parts.dto';

export class UpdatePartsTypeServiceDto extends PartialType(CreateServicesPartsDto) {}
