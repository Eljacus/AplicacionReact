import api from "../api/axios";

export interface LoginResponse {
  token: string;
}

const TOKEN_KEY = "auth_token";

export const authService = {
  /**
   * Realiza el login utilizando la instancia de Axios
   */
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

  /**
   * Obtiene el token guardado
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Cierra sesión
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};
