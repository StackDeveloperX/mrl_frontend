// src/types/auth.ts

export type UserType = "employee" | "client";

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  user_type: UserType;
  status: "active" | "inactive";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: AuthUser;
}

export interface RefreshResponse {
  token: string;
  refresh_token: string;
  user: AuthUser;
}
