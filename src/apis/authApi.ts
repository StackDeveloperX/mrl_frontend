// src/apis/authApi.ts
import { apiClient, setAuthToken } from "@/lib/apiClient";
import { API_ROUTES } from "@/lib/apiRoutes";
import type {
    LoginRequest,
    LoginResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    AuthUser,
} from "@/types/auth";

export const authApi = {
    async login(payload: LoginRequest): Promise<LoginResponse> {
        const res = await apiClient.post<LoginResponse>(
            API_ROUTES.auth.login,
            payload
        );
        // store token globally for future calls
        setAuthToken(res.data.token);
        return res.data;
    },

    async forgotPassword(payload: ForgotPasswordRequest): Promise<void> {
        await apiClient.post(API_ROUTES.auth.forgotPassword, payload);
    },

    async resetPassword(payload: ResetPasswordRequest): Promise<void> {
        await apiClient.post(API_ROUTES.auth.resetPassword, payload);
    },

    async me(): Promise<AuthUser> {
        const res = await apiClient.get<AuthUser>(API_ROUTES.auth.me);
        return res.data;
    },

    // helpful for logout
    logout() {
        setAuthToken(undefined);
    },
};
