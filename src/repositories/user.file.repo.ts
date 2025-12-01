import { promises as fs } from 'fs';
import path from 'path';
import { User } from '../models/user.model';

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');

export const readUsersFromFile = async (): Promise<User[]> => {
    try {
        const json = await fs.readFile(dataFilePath, 'utf-8');
        
        if(!json.trim()) return [];
        return JSON.parse(json) as User[];

    } catch (err: any) {
        if(err.code == 'ENOENT') return [];
        throw err;
    }
};

export const writeUsersToFile = async (users: User[]): Promise<void> => {
    const json = JSON.stringify(users, null, 2);
    await fs.writeFile(dataFilePath, json, 'utf-8');
}