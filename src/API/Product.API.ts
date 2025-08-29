import axiosInstance from "../utils/axiosInstance";

export async function FetchProducts() {
  const res = await axiosInstance.get("/products"); 
  return res.data;
}


export async function FetchProductById(id: string | number) {
  const res = await axiosInstance.get(`/products/${id}`); 
  return res.data;
}