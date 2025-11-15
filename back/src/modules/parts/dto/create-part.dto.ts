import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional, IsBoolean } from 'class-validator';

export class CreatePartDto {
    @IsString()
    name: string

    @IsString()
    reference: string

    @IsInt()
    price: number

    @IsInt()
    stock:number
}