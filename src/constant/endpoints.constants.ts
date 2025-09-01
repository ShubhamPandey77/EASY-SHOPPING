import axiosInstance from "../utils/axiosInstance";

const Api_v1 = axiosInstance.defaults.baseURL;

export const Api_Endpoints = {
  login: `${Api_v1}/auth/login`,
  home: `${Api_v1}/home`,
  productId: (id: string | number) => `${Api_v1}/products/${id}`,
  searching: (limit: number, skip: number, search: string) =>
    `${Api_v1}/products/search?q=${encodeURIComponent(
      search
    )}&limit=${limit}&skip=${skip}&select=thumbnail,title,price`,
  paging: (limit: number, skip: number) =>
    `${Api_v1}/products?limit=${limit}&skip=${skip}&select=thumbnail,title,price&sortBy=title&order=asc`,
};
