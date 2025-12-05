import { promises as fs } from 'fs';
import path from 'path';
import { Cart } from '../models/cart.model';

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'carts.json');

export const readCartsFromFile = async (): Promise<Cart[]> => {
    try{
        const json = await fs.readFile(dataFilePath, 'utf-8');
        if(!json.trim()) return [];

    const data = JSON.parse(json) as Cart[];
        return data;
    } catch(err:any) {
        if(err.code === 'ENOENT') return [];
        throw err;
    }
};

export const writeCartsToFile = async (carts: Cart[]): Promise<void> => {
    const json = JSON.stringify(carts, null, 2);
  await fs.writeFile(dataFilePath, json, 'utf-8');
}