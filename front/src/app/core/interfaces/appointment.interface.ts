import { DataSelectService } from "./partTypeService.interface"
export interface MechanicData{
  id: number,
  fullName: string
}
export interface MechanicSlot {
  mechanic: MechanicData
  slot: Date[]
}

export interface AvailableDay {
  day: Date
  slot: MechanicSlot[]
}

export enum StateServie {
  STARTED,
  PENDING,
  CANCELLED,
  FINISH
}

export interface Appointment {
    state: StateServie;
    clientId: number;
    carId: number;
    mechanicId: number;
    appoiment_date: Date;
    mileage_at_delivery: number;
    duration: string
}

export interface DataCreateAppointment{
  appoinment: Appointment,
  servicesSelected: DataSelectService[]
}