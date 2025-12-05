import { promises as fs} from 'fs';
import path from 'path';
import { Order } from '../models/order.model';

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'orders.json');

export const readOrdersFromFile = async(): Promise<Order[]> => {
    try {
        const json = await fs.readFile(dataFilePath, 'utf-8');
        if(!json) return [];

        const data = JSON.parse(json) as Order[];
        return data;
    } catch(err: any) {
        if(err.code === 'ENOENT') return [];
        throw err;
    }
}

export const writeOrdersToFile = async (orders: Order[]): Promise<void> => {
    const json = JSON.stringify(orders, null, 2);
    return fs.writeFile(dataFilePath, json, 'utf-8');
}