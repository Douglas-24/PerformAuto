import { DataSelectService, DataServicePartUser } from "./partTypeService.interface"
import { Car } from "./car.interface"
import { User, Employee } from "./user.interfaces"
import { ServicesOfferedInterface } from "./servicesOffered.interfaces"
export interface MechanicData {
  id: number,
  fullName: string
}

export interface DateReserved {
  date: Date,
  reservedDateClient: boolean
}
export interface MechanicSlot {
  mechanic: MechanicData
  slot: DateReserved[]
}

export interface AvailableDay {
  day: Date
  slot: MechanicSlot[]
}

export enum StateServie {
  STARTED = "STARTED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  FINISH = "FINISH"
}


export interface Appointment {
  id?: number
  state: StateServie;
  clientId: number;
  carId: number;
  mechanicId: number;
  appoiment_date: Date;
  mileage_at_delivery: number;
  duration: number
}

export interface AppointmentMechanicInterface extends Appointment {
  id: number
}

export interface DataCreateAppointment {
  appoinment: Appointment,
  servicesSelected: DataSelectService[]
}

export interface AppointmentUserInterface extends Appointment {
  id: number
  client: User,
  car: Car,
  mechanic: Employee
  services: ServicesAppointmentUser[]
}

export interface ServicesAppointmentUser {
  id: number
  id_appoiment: number
  id_service: number
  parts_used: DataServicePartUser[]
  services: ServicesOfferedInterface
}