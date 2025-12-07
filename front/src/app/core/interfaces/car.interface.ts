import { Appointment } from "./appointment.interface";
export interface Car {
  id?: number;
  photo?: string;
  brand: string;
  model: string;
  enrolment: string;        
  chassis_number: string; 
  last_revision?: Date
  current_mileage: number;
  engine: string;
  ownerId: number;
}

export interface CarUser extends Car{
  services: Appointment[]
}
