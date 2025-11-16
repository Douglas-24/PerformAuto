
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
