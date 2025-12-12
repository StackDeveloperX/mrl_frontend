// src/types/rbac.ts

export interface Role {
    id: number;
    name: string;
    description?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface RoleCreate {
    name: string;
    description?: string;
    is_active?: boolean;
}

export interface RoleUpdate {
    name?: string;
    description?: string;
    is_active?: boolean;
}

export interface Permission {
    id: number;
    code: string;        // e.g. "jobs.view"
    name: string;
    description?: string;
    module?: string;     // e.g. "jobs"
    created_at?: string;
    updated_at?: string;
}

export interface PermissionCreate {
    code: string;
    name: string;
    description?: string;
    module?: string;
}

export interface PermissionUpdate {
    name?: string;
    description?: string;
    module?: string;
}

export interface PermissionGroup {
    id: number;
    name: string;
    description?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface PermissionGroupCreate {
    name: string;
    description?: string;
    is_active?: boolean;
}

export interface PermissionGroupUpdate {
    name?: string;
    description?: string;
    is_active?: boolean;
}
