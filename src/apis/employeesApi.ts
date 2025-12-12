// src/apis/employeesApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { Employee, EmployeeCreate, EmployeeUpdate } from "@/types/employees";

export const employeesApi = {
    async list(): Promise<Employee[]> {
        const res = await apiClient.get<Employee[]>(API_ROUTES.employees.list);
        return res.data;
    },

    async create(payload: EmployeeCreate): Promise<Employee> {
        const res = await apiClient.post<Employee>(
            API_ROUTES.employees.list,
            payload
        );
        return res.data;
    },

    async getById(id: number | string): Promise<Employee> {
        const res = await apiClient.get<Employee>(API_ROUTES.employees.byId(id));
        return res.data;
    },

    async update(
        id: number | string,
        payload: EmployeeUpdate
    ): Promise<Employee> {
        const res = await apiClient.put<Employee>(
            API_ROUTES.employees.byId(id),
            payload
        );
        return res.data;
    },

    async remove(id: number | string): Promise<void> {
        await apiClient.delete(API_ROUTES.employees.byId(id));
    },

    async invite(email: string): Promise<void> {
        // only if your backend has /employees/invite
        await apiClient.post(API_ROUTES.employees.invite, { email });
    },
};
