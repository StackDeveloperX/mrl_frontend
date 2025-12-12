// src/apis/permissionsApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { Permission, PermissionCreate, PermissionUpdate } from "@/types/rbac";

export const permissionsApi = {
    async list(): Promise<Permission[]> {
        const res = await apiClient.get<Permission[]>(API_ROUTES.permissions.list);
        return res.data;
    },

    async create(payload: PermissionCreate): Promise<Permission> {
        const res = await apiClient.post<Permission>(
            API_ROUTES.permissions.list,
            payload
        );
        return res.data;
    },

    async getById(id: number | string): Promise<Permission> {
        const res = await apiClient.get<Permission>(
            API_ROUTES.permissions.byId(id)
        );
        return res.data;
    },

    async update(
        id: number | string,
        payload: PermissionUpdate
    ): Promise<Permission> {
        const res = await apiClient.put<Permission>(
            API_ROUTES.permissions.byId(id),
            payload
        );
        return res.data;
    },

    async remove(id: number | string): Promise<void> {
        await apiClient.delete(API_ROUTES.permissions.byId(id));
    },
};
