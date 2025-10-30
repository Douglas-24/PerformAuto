export interface User {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  password: string;
  phone_number: number;
  address: string;
  postal_code: number;
  rol: Role | 'CLIENT';
}

export enum Role {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
    CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
    WAREHOUSE_MANAGER = 'WAREHOUSE_MANAGER',
    MECHANIC = 'MECHANIC'
}