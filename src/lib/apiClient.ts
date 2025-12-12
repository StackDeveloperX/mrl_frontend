// src/lib/apiClient.ts
import axios from "axios";

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://mrl.deepshid.com/api/v1";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
});

// Call this after login / logout to update token
export function setAuthToken(token?: string) {
    if (token) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common["Authorization"];
    }
}
