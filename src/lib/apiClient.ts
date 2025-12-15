import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://abc.mrl.local/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

const ACCESS_TOKEN_KEY = "mrl_token";
const REFRESH_TOKEN_KEY = "mrl_refresh";

export function getTokens() {
  if (typeof window === "undefined") return { access: null, refresh: null };
  return {
    access: localStorage.getItem(ACCESS_TOKEN_KEY),
    refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

export function setTokens(access?: string, refresh?: string) {
  if (typeof window === "undefined") return;

  if (access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    delete apiClient.defaults.headers.common["Authorization"];
  }

  if (refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
}

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  const { access } = getTokens();
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// Auto-refresh token when expired (401)
apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const { refresh } = getTokens();
      if (!refresh) throw err;

      try {
        const refreshRes = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${refresh}` } }
        );

        setTokens(refreshRes.data.token, refreshRes.data.refresh_token);

        original.headers.Authorization = `Bearer ${refreshRes.data.token}`;

        return apiClient(original);
      } catch (refreshError) {
        setTokens(undefined);
        throw refreshError;
      }
    }

    throw err;
  }
);
