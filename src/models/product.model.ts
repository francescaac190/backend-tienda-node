export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    category?: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductDTO {
    name: string;
    price: number;
    description?: string;
    category?: string;
    stock: number;
}

export interface UpdateProductDTO {
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    stock?: number;
}