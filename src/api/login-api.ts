import axiosInstance from "../utils/axiosInstance";
import { Api_Endpoints } from "../constant/endpoints.constants";

export default async function loginApi(
  data: FormData
): Promise<{ accessToken: string }> {
  const res = await axiosInstance.post(Api_Endpoints.login, data);
  return res.data;
}
