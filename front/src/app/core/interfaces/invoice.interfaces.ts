import { ServiceParts, StateChangePart, UrgentChangePart } from "./partTypeService.interface";
import { Appointment } from "./appointment.interface";
import { PartUsed } from "./parts.interfaces";
import { ServicesOfferedInterface } from "./servicesOffered.interfaces";
export interface InvoiceResponse {
    id: number;
    appoiment: AppointmentServiceInvoice;
    id_appoiment: number;
    userId: number;
    total_cost: number;
    notes: string;
    date_invoice_issuance: Date;
}
export interface AppointmentServiceInvoice extends Appointment {
  services: ServicePartsAppointment[]
}

export interface DataServicePart {
    id?: number
    appoimentServiceId: number
    partId: number
    quantity: number
    replaced: boolean
    statePart: StateChangePart
    part?: PartUsed
    urgentChangePart: UrgentChangePart[]
}

export interface ServicePartsAppointment {
    parts_used: DataServicePart[]
    services: ServicesOfferedInterface
}