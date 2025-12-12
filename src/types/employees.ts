// src/types/employees.ts

export interface Employee {
    id: number;
    user_id: number;
    employee_number?: string;
  
    email: string;
    first_name: string;
    last_name?: string;
  
    position?: string;
    department?: string;
    hire_date?: string; // yyyy-mm-dd
    phone?: string;
  
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
  
    notes?: string;
    is_active?: boolean;
  
    created_at?: string;
    updated_at?: string;
  }
  
  export interface EmployeeCreate {
    email: string;
    first_name: string;
    password: string;
  
    last_name?: string;
    position?: string;
    department?: string;
    hire_date?: string; // yyyy-mm-dd
    phone?: string;
  }
  
  export interface EmployeeUpdate {
    first_name?: string;
    last_name?: string;
  
    position?: string;
    department?: string;
    hire_date?: string; // yyyy-mm-dd
    phone?: string;
  
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
  
    notes?: string;
    is_active?: boolean;
  }
  