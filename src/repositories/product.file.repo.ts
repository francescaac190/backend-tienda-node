import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '../models/product.mode';

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'products.json');

export const readProductsFromFile = async (): Promise<Product[]> => {
    try {
        const json = await fs.readFile(dataFilePath, 'utf-8');
        if(!json.trim()) {return []}

        const data = JSON.parse(json) as Product[];
        return data;
    } catch (err:any) {
        if(err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
};

export const writeProductsToFile = async (products:Product[]): Promise<void> => {
    const json = JSON.stringify(products, null, 2);
    await fs.writeFile(dataFilePath, json, 'utf-8');
};
