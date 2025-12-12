// src/apis/permissionGroupsApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type {
    PermissionGroup,
    PermissionGroupCreate,
    PermissionGroupUpdate,
} from "@/types/rbac";

export const permissionGroupsApi = {
    async list(): Promise<PermissionGroup[]> {
        const res = await apiClient.get<PermissionGroup[]>(
            API_ROUTES.permissionGroups.list
        );
        return res.data;
    },

    async create(payload: PermissionGroupCreate): Promise<PermissionGroup> {
        const res = await apiClient.post<PermissionGroup>(
            API_ROUTES.permissionGroups.list,
            payload
        );
        return res.data;
    },

    async getById(id: number | string): Promise<PermissionGroup> {
        const res = await apiClient.get<PermissionGroup>(
            API_ROUTES.permissionGroups.byId(id)
        );
        return res.data;
    },

    async update(
        id: number | string,
        payload: PermissionGroupUpdate
    ): Promise<PermissionGroup> {
        const res = await apiClient.put<PermissionGroup>(
            API_ROUTES.permissionGroups.byId(id),
            payload
        );
        return res.data;
    },

    async remove(id: number | string): Promise<void> {
        await apiClient.delete(API_ROUTES.permissionGroups.byId(id));
    },
};
