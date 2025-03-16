import { Role } from "../Enums/Role";

export interface IUser {
    id: number,
    name: string,
    address: string,
    role: Role,
    username: string,
    password: string
};