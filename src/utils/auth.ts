export const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getToken = (): string | null => localStorage.getItem("authToken");
export const clearToken = () => localStorage.removeItem("authToken");
export const isAuthenticated = (): boolean => !!getToken();
