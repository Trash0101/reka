export interface Item {
    img: number;
    id: number;
    name: string;
    price: number;
    priceOld: number|null
    category: {
        id: number,
        title: string,
    }
    materials: {
        id: number,
        title: string,
    }[]|[],
    tags:string[]|[]
}
export interface CartItem {
    id: number,
    price: number,
    priceOld: number|null,
    quantity: number,
    salePercentage?: number,
}
export interface CartStorageItem {
    id: number,
    quantity: number
}
export interface ItemAPI {
    id: string;
    quantity: number;
}

export interface CatalogueItem extends Item {
    priceMax: number;
    priceEUR: number;
    priceEURMax: number;
    description: string;
}
