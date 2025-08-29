import { useState, useEffect } from "react";
import { fetchProductByLimit } from "../../api/product-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCart from "../cart/UseCart";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

function ProductListing() {
  const { addToCart } = useCart();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); 
  const [debouncedSearch, setDebouncedSearch] = useState(""); // new state
  const limit = 10;

  const navigate = useNavigate();

  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { isError, error, isLoading, data } = useQuery<{ products: Product[]; total: number }, Error>({
    queryKey: ["products", page, limit, debouncedSearch], 
    queryFn: () => fetchProductByLimit(page, limit, debouncedSearch),
    keepPreviousData : true,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <>
      <Toaster />
      <div className="p-4">
        
        <div className="mb-8 flex gap-3 p-16">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setPage(1); 
              setSearch(e.target.value);
            }}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.products.length ? (
          data.products.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/products/${item.id}`)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 truncate">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>

                <h3 className="text-indigo-600 font-bold text-xl mb-4">
                  ${item.price}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                    toast("Item Successfully Added To Cart ✅");
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg transition duration-300"
                >
                  ➕ Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ↩️ Prev
        </button>
        <span>
          Page {page} of {Math.ceil(data.total / limit)}
        </span>
        <button
          disabled={page >= Math.ceil(data.total / limit)}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next ↪️
        </button>
      </div>
    </>
  );
}

export default ProductListing;
