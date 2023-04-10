export interface MilkProduct {
    name?: string,
    type?: string,
    storage?: number,
    id?: string
}

export interface CartProduct {
    product: MilkProduct,
    quantity: number
}