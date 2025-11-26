import { IsInt, IsDateString, IsEnum, Min, ValidateNested, IsString} from 'class-validator';
import { StateServie, StateChangePart } from '@prisma/client';
import { DataServiceSelected } from 'src/modules/service-parts/dto/TypeServiceParts.dto';

export class CreateAppoimentDto {
    @IsEnum(StateServie)
    state: StateServie;

    @IsInt()
    clientId: number;

    @IsInt()
    carId: number;

    @IsInt()
    mechanicId: number;

    @IsDateString()
    appoiment_date: Date;

    @IsInt()
    @Min(0)
    mileage_at_delivery: number;

    @IsString()
    duration: number
}

export class CreateAppoimentServicePartDto{
    appoimentServiceId:number
    partId:number
    quantity: number
    replaced: boolean
    statePart: StateChangePart
}
export class DataAppointmentCreate{
    appoinment: CreateAppoimentDto
    servicesSelected: DataServiceSelected[]
}
