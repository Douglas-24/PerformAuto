import { Appointment } from "./appointment.interface";
import { User } from "./user.interfaces";
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
  owner?:User
}

export interface CarUser extends Car{
  services: Appointment[]
}
