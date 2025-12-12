// src/types/employees.ts

export interface Employee {
    id: number;
    user_id: number;
    employee_number: string;
    position?: string;
    branch_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    is_active: boolean;
    // add other fields from the OpenAPI if you need them
    [key: string]: any;
}

export interface EmployeeCreate {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    branch_id?: number;
    position?: string;
    // plus any extra fields your OpenAPI requires
}

export interface EmployeeUpdate {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    branch_id?: number;
    position?: string;
    is_active?: boolean;
}
