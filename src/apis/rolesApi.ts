// src/apis/rolesApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { Role, RoleCreate, RoleUpdate } from "@/types/rbac";

export const rolesApi = {
    async list(): Promise<Role[]> {
        const res = await apiClient.get<Role[]>(API_ROUTES.roles.list);
        return res.data;
    },

    async create(payload: RoleCreate): Promise<Role> {
        const res = await apiClient.post<Role>(API_ROUTES.roles.list, payload);
        return res.data;
    },

    async getById(id: number | string): Promise<Role> {
        const res = await apiClient.get<Role>(API_ROUTES.roles.byId(id));
        return res.data;
    },

    async update(id: number | string, payload: RoleUpdate): Promise<Role> {
        const res = await apiClient.put<Role>(API_ROUTES.roles.byId(id), payload);
        return res.data;
    },

    async remove(id: number | string): Promise<void> {
        await apiClient.delete(API_ROUTES.roles.byId(id));
    },
};
