export interface Materials {
    id: number,
    title: string,
}
export interface MaterialComplex extends Materials {
    materials: Materials[]
}
export interface Item {
    img: number;
    id: number;
    title: string;
    price: number;
    price_old: number|null
    category: {
        id: number,
        title: string,
    }
    materials: Materials[]|[],
    tags:string[]|[]
}
export interface CartItem {
    name: string,
    img: string,
    id: number,
    price: number,
    price_old: number|null,
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

export interface APIres {
    data: Item[],
    links: {[key: string]: string},
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            url: string,
            label: string,
            active: string,
        }[],
        path: string,
        per_page: number,
        to: number,
        total: number
    },
    categories: {
        [key: string]: string
    }
    base_filters: {
        prices: number[]
        materials:Materials[]|MaterialComplex[]
        tags: {
            [key: string]: string
        }
    }
    filters: {
        prices: number[]
        materials:Materials[]|MaterialComplex[]
        tags: {
            [key: string]: string
        }
    }
}
export interface QueryParams {
    category?: number,
    prices?: number[],
    materials?: number[],
    tags?: number[],
    page?: number,
    limit: number,
    sortBy?: string,
    orderBy?: string
}
