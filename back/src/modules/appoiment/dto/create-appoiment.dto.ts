import { IsInt, IsDateString, IsEnum, Min, ValidateNested, IsString} from 'class-validator';
import { StateServie } from '@prisma/client';

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
    duration: string
}
