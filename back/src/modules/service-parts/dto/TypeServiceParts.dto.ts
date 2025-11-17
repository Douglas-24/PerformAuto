import { User, Car } from "@prisma/client";

export class PartDto {
  id: number;
  name: string;
}

export class PartsTypeServiceDto {
  id: number;
  partId: number;
  quantity: number;
  changeRecomended: boolean;
  part: PartDto;
}

export class TypeServiceDto {
  id: number;
  name: string;
  description: string;
  price: number;
  frequency_km: number;
  frequency_time: string;
  parts: PartsTypeServiceDto[];
}

export class DataDto {
  userId: number
  carId: number
  carCurrentMillage: number
}

export enum StateChangePart {
  SHOULD_CHANGE = 'SHOULD_CHANGE',
  REVIEW = 'REVIEW',
  NO_CHANGE = 'NO_CHANGE'
}

export class DataPartChange{
  idPart: number
  namePart: string
  price:number
  acctionPart:StateChangePart
  observation: string
}