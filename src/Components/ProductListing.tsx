import { useState } from "react";
import FetchProducts from "../API/ProductAPI";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ProductListing() {
  const [add, setAdd] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: FetchProducts,
  });

  const productsPerPage = 10;
  const totalPages = data ? Math.ceil(data.products.length / productsPerPage) : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    setAdd((prev) => prev + 1);
  }

  function handlePagination(selectedPage: number) {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">
        🛒 Cart Count:{" "}
        <span className="text-indigo-600 font-extrabold">{add}</span>
      </h1>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(productsPerPage)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-xl h-72"
            ></div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-red-600 font-semibold">
          Error: {(error as Error).message}
        </p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.products
              ?.slice((page - 1) * productsPerPage, page * productsPerPage)
              .map((item: any) => (
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
                      onClick={handleAddToCart}
                      className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg transition duration-300"
                    >
                      ➕ Add To Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-16 pt-4  flex-wrap">
            {/* Prev Button */}
            <button
              disabled={page === 1}
              onClick={() => handlePagination(page - 1)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-white ${
                page === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition`}
            >
              ⬅️ Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePagination(i + 1)}
                className={`px-4 py-2 rounded-full border font-medium transition ${
                  page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              disabled={page === totalPages}
              onClick={() => handlePagination(page + 1)}
              className={`flex items-center gap-1 px-8 py-4 rounded-full text-white ${
                page === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition`}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ProductListing;
