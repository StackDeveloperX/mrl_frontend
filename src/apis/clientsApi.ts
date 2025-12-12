// src/apis/clientsApi.ts
import { apiClient } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { Client, ClientCreate, ClientUpdate } from "@/types/clients";

export const clientsApi = {
  async list(): Promise<Client[]> {
    const res = await apiClient.get<Client[]>(API_ROUTES.clients.list);
    return res.data;
  },

  async create(payload: ClientCreate): Promise<Client> {
    const res = await apiClient.post<Client>(API_ROUTES.clients.list, payload);
    return res.data;
  },

  async getById(id: number | string): Promise<Client> {
    const res = await apiClient.get<Client>(API_ROUTES.clients.byId(id));
    return res.data;
  },

  async update(id: number | string, payload: ClientUpdate): Promise<Client> {
    const res = await apiClient.put<Client>(API_ROUTES.clients.byId(id), payload);
    return res.data;
  },
};
