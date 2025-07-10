export interface RoleDTO {
    id: number;
    authority: string;
  }
  
  export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: RoleDTO[];
  }
  