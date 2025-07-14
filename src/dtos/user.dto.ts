import { Address } from "./address.dto";
import { Role } from "./role.dto";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  addresses?: Address[]; // opcional
}

export interface UserRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
