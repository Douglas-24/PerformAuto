export interface Parts {
    name: string,
    reference: string,
    price: number,
    stock: number
}

export interface PartUsed extends Parts {
    id:number
} 

