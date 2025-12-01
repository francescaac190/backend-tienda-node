import { User, RegisterUserDTO } from '../models/user.model';
import { readUsersFromFile, writeUsersToFile } from '../repositories/user.file.repo';
import bcrypt from 'bcryptjs';

export const userService = {
    async findByEmail(email: string): Promise<User | undefined> {
        const users = await readUsersFromFile();
        return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    },

    async register(data: RegisterUserDTO): Promise<User> {
        const users = await readUsersFromFile();

        const existing = users.find(
            (u) => u.email.toLowerCase() === data.email.toLowerCase()
        )

        if(existing) {
            const error: any = new Error('Email ya registrado');
            error.status = 400;
            throw error;
        }

        const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
        const now = new Date();

        const passwordHash = await bcrypt.hash(data.password, 10);

        const newUser: User = {
            id: maxId + 1,
            name: data.name,
            email: data.email.toLowerCase(),
            passwordHash,
            role: 'user',
            createAt: now,
            updatedAt: now,
        }

        users.push(newUser);
        await writeUsersToFile(users);

        return newUser;
    },

    async validatePassword(user: User, plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, user.passwordHash);
    },

    async getAll(): Promise<User[]> {
        const users = await readUsersFromFile();
        return users;
    }
}