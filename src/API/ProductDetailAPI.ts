import axiosInstance from "../utils/axiosInstance";

export default async function FetchProductById(id: string | number) {
  const res = await axiosInstance.get(`/products/${id}`); 
  return res.data;
}