import { User, Car } from "@prisma/client";
import { CreateServiceWorkshopDto } from "src/modules/service-workshop/dto/create-service-workshop.dto";

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
  NO_CHANGE = 'NO_CHANGE',
  REVISED = 'REVISED',
  CHANGED = 'CHANGED',
  CHANGE_URGENT = 'CHANGE_URGENT'
}

export class DataPartChange{
  idPart: number
  namePart: string
  price:number
  acctionPart:StateChangePart
  frequency_km: number
  frequency_time: string
  observation: string
}

export class DataServiceSelected {
  parts: DataPartChange[]
  service: CreateServiceWorkshopDto
}