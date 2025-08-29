import axiosInstance from "../utils/axiosInstance";

// export async function fetchProducts() {
//   const res = await axiosInstance.get("/products"); 
//   return res.data;
// } this was needed when we are fetching the data without pagaing and we are doing paging as server side by using slice


export async function fetchProductById(id: string | number) {
  const res = await axiosInstance.get(`/products/${id}`); 
  return res.data;
}
export async function fetchProductByLimit(page: number, limit: number, search: string) {
  const skip = (page -1)*limit;
  let url = "";
  if (search) {
    url = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}&select=thumbnail,title,price`;
  } else {
    url = `/products?limit=${limit}&skip=${skip}&select=thumbnail,title,price`;
  }

  const res = await axiosInstance.get(url);
  return res.data; 
}