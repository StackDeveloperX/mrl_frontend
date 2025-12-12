// src/lib/apiRoutes.ts

export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
        me: "/auth/me",
    },

    users: {
        list: "/users",
        byId: (id: number | string) => `/users/${id}`,
    },

    employees: {
        list: "/employees",
        byId: (id: number | string) => `/employees/${id}`,
        // if your spec has invite endpoint:
        invite: "/employees/invite",
    },

    roles: {
        list: "/roles",
        byId: (id: number | string) => `/roles/${id}`,
    },

    permissions: {
        list: "/permissions",
        byId: (id: number | string) => `/permissions/${id}`,
    },

    permissionGroups: {
        list: "/permission-groups",
        byId: (id: number | string) => `/permission-groups/${id}`,
    },
} as const;
