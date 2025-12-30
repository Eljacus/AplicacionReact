import api from "../api/axios";

export interface LoginResponse {
  token: string;
}

const TOKEN_KEY = "auth_token";

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { data } = await api.post("/Authentication/Login", {
      username,
      password,
    });

    if (!data) throw new Error("No se recibió un token válido.");

    localStorage.setItem(TOKEN_KEY, data);
    return { token: data };
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};
