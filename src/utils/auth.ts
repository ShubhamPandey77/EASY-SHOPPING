export const setToken = (accessToken: string) => {
  localStorage.setItem("authToken", accessToken);
};

export const getToken = (): string | null => localStorage.getItem("authToken");
export const clearToken = () => localStorage.removeItem("authToken");
export const isAuthenticated = (): boolean => !!getToken();
