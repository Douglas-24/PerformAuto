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
}


export interface EmployeeWorkingHours {
  dayOfWeek: number
  startTime: string
  endTime: string
  employeeId?: number
}


export enum RoleEmployee {
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
  WAREHOUSE_MANAGER = 'WAREHOUSE_MANAGER',
  MECHANIC = 'MECHANIC'
}
export interface Employee {
  id?:number
  name: string;
  lastname: string;
  email: string;
  rol: RoleEmployee

}

export interface EmployeeData {
  employee: Employee
  timeTableEmployee: EmployeeWorkingHours
}