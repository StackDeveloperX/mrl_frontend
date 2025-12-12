// src/apis/usersApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";

// API DTOs (match what we discussed earlier)
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
}

export interface UserCreate {
  email: string;
  first_name: string;
  last_name?: string;
  user_type?: UserType;
  status?: UserStatus;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  user_type?: UserType;
  status?: UserStatus;
}

export const usersApi = {
  async create(payload: UserCreate): Promise<User> {
    const res = await apiClient.post<User>(API_ROUTES.users.list, payload);
    return res.data;
  },

  async getById(id: number | string): Promise<User> {
    const res = await apiClient.get<User>(API_ROUTES.users.byId(id));
    return res.data;
  },

  async update(id: number | string, payload: UserUpdate): Promise<User> {
    const res = await apiClient.put<User>(API_ROUTES.users.byId(id), payload);
    return res.data;
  },
};



// // src/apis/usersApi.ts
// import { apiClient } from "@/lib/apiClient";
// import { API_ROUTES } from "@/lib/apiRoutes";
// import type { User, UserCreate, UserUpdate } from "@/types/users";

// export const usersApi = {
//     async list(): Promise<User[]> {
//         const res = await apiClient.get<User[]>(API_ROUTES.users.list);
//         return res.data;
//     },

//     async create(payload: UserCreate): Promise<User> {
//         const res = await apiClient.post<User>(API_ROUTES.users.list, payload);
//         return res.data;
//     },

//     async getById(id: number | string): Promise<User> {
//         const res = await apiClient.get<User>(API_ROUTES.users.byId(id));
//         return res.data;
//     },

//     async update(id: number | string, payload: UserUpdate): Promise<User> {
//         const res = await apiClient.put<User>(API_ROUTES.users.byId(id), payload);
//         return res.data;
//     },

//     async remove(id: number | string): Promise<void> {
//         await apiClient.delete(API_ROUTES.users.byId(id));
//     },
// };
