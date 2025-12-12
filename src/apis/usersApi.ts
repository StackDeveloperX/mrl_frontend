// src/apis/usersApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { User, UserCreate, UserUpdate } from "@/types/users";

export const usersApi = {
    async list(): Promise<User[]> {
        const res = await apiClient.get<User[]>(API_ROUTES.users.list);
        return res.data;
    },

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

    async remove(id: number | string): Promise<void> {
        await apiClient.delete(API_ROUTES.users.byId(id));
    },
};
