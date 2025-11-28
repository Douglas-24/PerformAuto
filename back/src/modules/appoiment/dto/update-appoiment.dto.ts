import { PartialType } from '@nestjs/mapped-types';
import { CreateAppoimentDto, CreateAppoimentServicePartDto } from './create-appoiment.dto';

export class UpdateAppoimentDto extends PartialType(CreateAppoimentDto) {}
export class UpdateAppoimentServicePartDto extends PartialType(CreateAppoimentServicePartDto){}
