import axiosInstance from "../utils/axiosInstance";

export  default async function FetchProducts() {
  const res = await axiosInstance.get("/products"); 
  return res.data;
}
