import {Role} from "./role.dtos";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}

export interface UserRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
