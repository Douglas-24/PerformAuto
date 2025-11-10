import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional, IsPositive } from 'class-validator';

export class CreateTypeServiceDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsInt()
    @IsPositive()
    price: number

    @IsInt()
    frequency_km: number

    @IsString()
    frequency_time: string

}
