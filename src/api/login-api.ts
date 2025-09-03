import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../constant/endpoints.constants";

export default async function loginApi(
  data: { username: string; password: string }
): Promise<{ accessToken: string }> {
  const res = await axiosInstance.post(API_ENDPOINTS.login, data);
  return res.data;
}
