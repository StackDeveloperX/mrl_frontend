// src/apis/authApi.ts
import { apiClient, setAuthToken } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { LoginRequest, LoginResponse, RefreshResponse, AuthUser } from "@/types/auth";

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>(API_ROUTES.auth.login, payload);
    setAuthToken(res.data.token);
    return res.data;
  },

  // ✅ refresh endpoint: POST /auth/refresh (no body, uses Bearer token)
  async refresh(): Promise<RefreshResponse> {
    const res = await apiClient.post<RefreshResponse>(API_ROUTES.auth.refresh);
    setAuthToken(res.data.token);
    return res.data;
  },

  async me(): Promise<AuthUser> {
    const res = await apiClient.get<AuthUser>(API_ROUTES.auth.me);
    return res.data;
  },

  logout() {
    setAuthToken(undefined);
  },
};
