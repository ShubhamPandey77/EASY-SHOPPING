import axiosInstance from "../utils/axiosInstance";
import { Api_Endpoints } from "../constant/endpoints.constants";

const DEFAULT_LIMIT = 10;

export async function fetchProductById(id: string | number) {
  const res = await axiosInstance.get(Api_Endpoints.productId(id));
  return res.data;
}

export async function fetchProductByLimit(
  page: number,
  limit: number = DEFAULT_LIMIT,
  search: string = ""
) {
  const skip = (page - 1) * limit;
  let url: string;

  if (search) {
    url = Api_Endpoints.searching(limit, skip, search);
  } else {
    url = Api_Endpoints.paging(limit, skip);
  }

  const res = await axiosInstance.get(url);
  return res.data as {
    products: {
      id: number;
      title: string;
      description: string;
      price: number;
      thumbnail: string;
    }[];
    total: number;
  };
}
