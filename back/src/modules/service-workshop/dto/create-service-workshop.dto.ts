import { IsString, IsEmail, IsInt, IsEnum, Matches, MinLength, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateServiceWorkshopDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    price: number;

    @IsInt()
    frequency_km: number;

    @IsString()
    frequency_time: string;

    @IsString()
    duration: number;
}
