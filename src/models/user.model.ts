
export interface User {
    id: number,
    name: string,
    email: string,
    passwordHash: string,
    role: 'user' | 'admin',
    createAt: Date,
    updatedAt: Date,
}

export interface RegisterUserDTO {
    name: string,
    email: string,
    password: string,
}

export interface LoginUserDTO {
    email: string,
    password: string,
}