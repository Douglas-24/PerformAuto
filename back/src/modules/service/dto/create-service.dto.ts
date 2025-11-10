import { IsInt, IsString, IsNotEmpty, IsUrl, IsOptional, IsEnum, IsPositive } from 'class-validator';

export enum StateService {
  STARTED = 'STARTED',
  PENDING = 'PENDING',
  FINISH = 'FINISH',
}


export class CreateServiceDto {
    @IsEnum(StateService)
    state: StateService;

    @IsInt()
    @IsPositive()
    total_cost: number;

    @IsInt()
    clientId: number;

    @IsInt()
    carId: number;

    @IsInt()
    typeServiceId: number;

    @IsInt()
    mechanicId: number;

}
