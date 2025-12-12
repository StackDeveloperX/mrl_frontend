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

// login returns token + user (as per your updated yaml)
export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// refresh returns token + user (yaml shows token + user)
export interface RefreshResponse {
  token: string;
  user: AuthUser;
}
