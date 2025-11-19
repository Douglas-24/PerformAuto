import { Parts } from "./parts.interfaces"
import { ServicesOfferedInterface } from "./servicesOffered.interfaces"

export interface ServiceSelectPart extends ServicesOfferedInterface {
    parts: partTypeService[]
}

export interface partTypeService {
    partId: number,
    typeServiceId: number,
    quantity: number,
    changeRecomended: boolean
    part: Parts
}

export enum StateChangePart {
    SHOULD_CHANGE = 'SHOULD_CHANGE',
    REVIEW = 'REVIEW',
    NO_CHANGE = 'NO_CHANGE'
}

export interface postDataPartsService {
    userId: number
    carId?: number
    carCurrentMillage: number
}

export interface DataPartChange {
    idPart: number
    namePart: string
    price: number
    acctionPart: StateChangePart
    frequency_km: number
    frequency_time: string
    observation: string
}

export interface DataSelectService {
  parts: DataPartChange[]
  service: ServicesOfferedInterface
}