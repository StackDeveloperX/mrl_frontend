import { apiClient, setTokens } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { LoginRequest, LoginResponse, RefreshResponse, AuthUser } from "@/types/auth";

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>(API_ROUTES.auth.login, payload);

    // Save access + refresh token
    setTokens(res.data.token, res.data.refresh_token);

    return res.data;
  },

  async refresh(): Promise<RefreshResponse> {
    const res = await apiClient.post<RefreshResponse>(API_ROUTES.auth.refresh);

    // Save new access token
    setTokens(res.data.token, res.data.refresh_token ?? undefined);

    return res.data;
  },

  async me(): Promise<AuthUser> {
    const res = await apiClient.get<AuthUser>(API_ROUTES.auth.me);
    return res.data;
  },

  logout() {
    setTokens(undefined);
  },
};
