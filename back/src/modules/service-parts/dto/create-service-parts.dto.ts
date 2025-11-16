import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional, IsBoolean } from 'class-validator';

export class CreateServicesPartsDto {
    @IsInt()
    partId: number

    @IsInt()
    typeServiceId: number

    @IsInt()
    quantity: number

    @IsBoolean()
    changeRecomended: boolean
}

