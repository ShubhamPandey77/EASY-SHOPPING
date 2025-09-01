import { useState } from "react";
import { fetchProductByLimit } from "../../api/product-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { ROUTE } from "../../constant/route.constants";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  products: string;
}

function ProductListing() {
  const { addToCart } = useCart();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const limit = 10;

  const navigate = useNavigate();

  const { isError, error, isLoading, data, refetch } = useQuery<
    { products: Product[]; total: number },
    Error>({
    queryKey: ["products", page, limit, querySearch],
    queryFn: () => fetchProductByLimit(page, limit, querySearch),
    keepPreviousData: true,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <>
      <Toaster />

      {/* Search Bar */}
      <div className="p-12 mt-10 mb-32 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex justify-center items-center gap-4 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none rounded-xl px-8 py-5 w-64 text-xl font-semibold bg-white text-gray-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300"
        />
        <button
          onClick={() => {
            setPage(1);
            setQuerySearch(search);
            refetch();
          }}
          className="bg-white text-indigo-600 font-bold px-6 py-5 rounded-xl shadow-md hover:bg-indigo-100 transition"
        >
          🔍 Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.products?.length ? (
          data.products.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => navigate(ROUTE.ProdDetail(item.id))}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.3 }}
              variants={cardVariants}
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
                    toast.success("Item Successfully Added To Cart ✅");
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg transition duration-300"
                >
                  ➕ Add To Cart
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Pagination */}
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

// Animation Variants
const cardVariants: Variants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};
