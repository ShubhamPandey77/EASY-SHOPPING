import { DEFAULT_LIMIT } from "../constant/values.contants";
import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../constant/endpoints.constants";

export interface Review {
  reviewerName?: string;
  rating?: number;
  comment?: string;
  date?: string;
}

export interface Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[]; // you used productImages[]
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  sku?: string;
  weight?: number;
  length?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  reviews?: Review[]; // previously was string | number
}

export interface ProductResponse {
  products: Product[];
  total: number;
}

export async function fetchProductById(
  id: string | number
): Promise<Product> {
  const res = await axiosInstance.get<Product>(API_ENDPOINTS.productId(id));
  return res.data;
}

export async function fetchProductByLimit(
  page: number,
  limit: number = DEFAULT_LIMIT,
  search: string = "",
  order: "asc" | "desc" = "asc",
  sortBy: "title" | "price" | "rating" | "stock"  = "title" 
): Promise<ProductResponse> {
  const skip = (page - 1) * limit;

  const params = search
    ? {
        q: search,
        limit,
        skip,
        select: "thumbnail,title,price,stock",
      }
    : {
        limit,
        skip,
        select: "thumbnail,title,price,stock",
        sortBy, 
        order,
        
      };

  const url = search ? API_ENDPOINTS.searching : API_ENDPOINTS.paging;

  const res = await axiosInstance.get<ProductResponse>(url, { params});
  return res.data;
}
