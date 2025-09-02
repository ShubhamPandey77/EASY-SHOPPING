import axiosInstance from "../utils/axiosInstance";

const API_V1 = axiosInstance.defaults.baseURL;

export const API_ENDPOINTS = {
  login: `${API_V1}/auth/login`,
  home: `${API_V1}/home`,
  productId: (id: string | number) => `${API_V1}/products/${id}`,
  searching: `${API_V1}/products/search`,
  paging: `${API_V1}/products`,
};
