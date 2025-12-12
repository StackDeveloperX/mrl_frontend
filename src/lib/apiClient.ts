// src/lib/apiClient.ts
import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://mrl.deepshid.com/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

const TOKEN_KEY = "mrl_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token?: string) {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common["Authorization"];
  }
}

// Initialize token on app start (call once in layout/provider if you want)
export function initAuthFromStorage() {
  const t = getAuthToken();
  if (t) setAuthToken(t);
}
