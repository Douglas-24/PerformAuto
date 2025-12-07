import { Parts, PartUsed } from "./parts.interfaces"
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
    CHANGED = 'CHANGED',
    REVISED = 'REVISED',
    NO_CHANGE = 'NO_CHANGE',
    CHANGE_URGENT = 'CHANGE_URGENT'
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
export interface DataServicePartMechanic {
    id?:number
    appoimentServiceId:number
    partId:number
    quatity: number
    replaced: boolean
    statePart: StateChangePart
    part?: PartUsed
    mechanicMessage?:string | null
    urlImg?:string | null
}

export interface DataSelectService {
  parts: DataPartChange[]
  service: ServicesOfferedInterface
}
export interface ServiceParts {
  parts_used: DataServicePartMechanic[]
  services: ServicesOfferedInterface
}