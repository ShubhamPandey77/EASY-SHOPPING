import axiosInstance from "../utils/axiosInstance";

const API_V1 = axiosInstance.defaults.baseURL;

export const API_ENDPOINTS = {
  login: `${API_V1}/auth/login`,
  home: `${API_V1}/home`,
  productId: (id: string | number) => `${API_V1}/products/${id}`,
  searching: `${API_V1}/products/search`,
  paging: `${API_V1}/products`,
  users: `${API_V1}/users`,
  usersSearch: `${API_V1}/users/search`,
  userAdd: `${API_V1}/users`,
  userRemove: `${API_V1}/users`,
  userEdit: `${API_V1}/users`,
};