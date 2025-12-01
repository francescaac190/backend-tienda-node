import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { readProductsFromFile, writeProductsToFile } from '../repositories/product.file.repo';

export const productService = {
    async findAll(): Promise<Product[]> {
        const products = await readProductsFromFile();
        return products;
    },

    async findById(id: number): Promise<Product | undefined> {
         const products = await readProductsFromFile();
        return products.find((p) => p.id === id);
    },

    async create(data: CreateProductDTO): Promise<Product> {
        const products = await readProductsFromFile();
        const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

        const now = new Date();

        const newProduct: Product = {
            id: maxId+1,
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            stock: data.stock??0,
            createdAt: now,
            updatedAt: now,
        };

        products.push(newProduct);
        await writeProductsToFile(products);
        return newProduct;
    },

    async update(id: number, data: UpdateProductDTO): Promise<Product | null> {
        const products = await readProductsFromFile();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return null;
        }

        const existing = products[index];

        const updated: Product = {
            ...existing,
            name: data.name ?? existing.name,
            price: data.price ?? existing.price,
            description: data.description ?? existing.description,
            category: data.category ?? existing.category,
            stock: data.stock ?? existing.stock,
            updatedAt: new Date(),
        }
 

        products[index] = updated;
        await writeProductsToFile(products);
        return updated;
    },

    async delete(id: number): Promise<boolean> {
        const products = await readProductsFromFile();
        const newProducts = products.filter((p) => p.id !==id);

        if(newProducts.length === products.length) {
            return false;
        }

        await writeProductsToFile(newProducts);
        return true;
    }
}