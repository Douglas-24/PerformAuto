interface BaseUser {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone_number: number;
  address: string;
  postal_code: number;
  rol: Role | 'CLIENT';
}

export interface User extends BaseUser {
  id?: number;
}

export interface UserRegister extends BaseUser {
  password: string;
}

export enum Role {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
    CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
    WAREHOUSE_MANAGER = 'WAREHOUSE_MANAGER',
    MECHANIC = 'MECHANIC'
}