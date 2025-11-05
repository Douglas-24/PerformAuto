import { User } from "./user.interfaces";

export interface Car {
  id?: number;
  photo?: string;
  brand: string;
  model: string;
  enrolment: string;        // Matrícula
  chassis_number: string;   // Número de bastidor
  last_revision: Date;
  current_mileage: number;
  engine: string;
  ownerId: number;
}
