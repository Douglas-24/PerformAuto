import { 
  IsInt, 
  IsNotEmpty, 
  IsString, 
  IsEnum, 
  IsDateString, 
  IsOptional, 
  Min 
} from 'class-validator';

export class CreateInvoiceDto {
  
  @IsInt()
  @IsNotEmpty()
  id_appoiment: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  total_cost: number;

  @IsString()
  @IsOptional()
  notes: string;
}