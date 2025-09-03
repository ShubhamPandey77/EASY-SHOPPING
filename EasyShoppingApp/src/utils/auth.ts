export const setToken = (accessToken: string) => {
  localStorage.setItem("authToken", accessToken); //yha par authtoken ek "key" hai jism accessToken store ho rha hai
};

export const getToken = (): string | null => localStorage.getItem("authToken");

export const clearToken = () => localStorage.removeItem("authToken");

export const isAuthenticated = (): boolean => !!getToken(); //yha par "!!" is used to convert the gettoken string value to the boolean type.

