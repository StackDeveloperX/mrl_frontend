// src/lib/apiRoutes.ts

export const API_ROUTES = {
    auth: {
      login: "/auth/login",
      refresh: "/auth/refresh",
      forgotPassword: "/auth/forgot-password",
      resetPassword: "/auth/reset-password",
      me: "/auth/me",
    },
  
    employees: {
      list: "/employees",
      byId: (id: number | string) => `/employees/${id}`,
      me: "/employees/me",
    },
  
    clients: {
      list: "/clients",
      byId: (id: number | string) => `/clients/${id}`,
      me: "/clients/me",
    },
  } as const;
  