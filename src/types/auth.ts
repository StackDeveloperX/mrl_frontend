// src/types/auth.ts

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;         // JWT
    refresh_token?: string;
    user: AuthUser;
}

export interface AuthUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    user_type: "employee" | "client";
    status: "active" | "inactive" | "pending";
    roles?: {
        id: number;
        name: string;
    }[];
    [key: string]: any; // extra fields from backend
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirm_password: string;
}
