import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../constant/endpoints.constants";
import { DEFAULT_LIMIT } from "@/constant/values.contants";

export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  birthDate: Date;
  role: string;
}

export interface UsersResponse {
  users: User[];
  total?: number;
  skip?: number;
  limit?: number;
  page?: number;
}

export async function FetchUsers(
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
  select?: string[]
): Promise<UsersResponse> {
  const skip = (page - 1) * limit;

  const res = await axiosInstance.get<UsersResponse>(API_ENDPOINTS.users, {
    params: {
      limit,
      skip,
      select: select?.join(","),
    },
  });

  return {
    ...res.data,
    page,
    limit,
  };
}



export async function SearchUsers(query: string): Promise<UsersResponse> {
  const res = await axiosInstance.get<UsersResponse>(
    API_ENDPOINTS.usersSearch,
    { params: { q: query } }
  );
  return res.data;
}

export async function EditUsers(
  id: string | number,
  payload: Partial<User>
): Promise<User> {
  const res = await axiosInstance.put<User>(
    `${API_ENDPOINTS.userEdit}/${id}`,
    payload
  );
  return res.data;
}

export async function RemoveUsers(id: string | number): Promise<User> {
  const res = await axiosInstance.delete<User>(`${API_ENDPOINTS.userRemove}/${id}`);
  return res.data;
}

export async function AddUsers(payload: Omit<User, 'id'>): Promise<User> {
  const res = await axiosInstance.post<User>(
    API_ENDPOINTS.userAdd,
    payload
  );
  return res.data;
}

export async function SortUsers(
  sortBy: string,
  order: "asc" | "desc"
): Promise<UsersResponse> {
  const res = await axiosInstance.get<UsersResponse>(API_ENDPOINTS.users, {
    params: { sortBy, order },
  });
  return res.data;
}

