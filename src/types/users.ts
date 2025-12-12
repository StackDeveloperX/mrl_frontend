// src/types/users.ts

export type UserStatus = "active" | "inactive" | "pending";
export type UserType = "employee" | "client";

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    user_type: UserType;
    status: UserStatus;
    created_at?: string;
    updated_at?: string;
    [key: string]: any;
}

export interface UserCreate {
    email: string;
    first_name: string;
    last_name?: string;
    user_type?: UserType;      // default employee
    status?: UserStatus;       // default active
}

export interface UserUpdate {
    first_name?: string;
    last_name?: string;
    user_type?: UserType;
    status?: UserStatus;
}
