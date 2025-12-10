import { IsInt, IsDateString, IsEnum, Min, ValidateNested, IsString, IsIn, IsBoolean, isString} from 'class-validator';
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

    @IsString()
    notes?:string
}

export class CreateAppoimentServicePartDto{
    @IsInt()
    appoimentServiceId:number

    @IsInt()
    partId:number

    @IsInt()
    quantity: number

    @IsBoolean()
    replaced: boolean

    @IsEnum(StateChangePart)
    statePart: StateChangePart


    @IsString()
    mechanicMessage?:string

    @IsString()
    urlImg?:string

}
export class DataAppointmentCreate{
    appoinment: CreateAppoimentDto
    servicesSelected: DataServiceSelected[]
}
