import { PartialType } from '@nestjs/mapped-types';
import { CreatePartsTypeServiceDto } from './create-parts-type-service.dto';

export class UpdatePartsTypeServiceDto extends PartialType(CreatePartsTypeServiceDto) {}
