import { useState } from "react";
import { FetchProducts } from "../API/Product.API";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useCart } from "../Context/CartContext";
// Optional: define product type if you have one, or use this:
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

function ProductListing() {
  const {addToCart} = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const navigate = useNavigate();

  // Explicitly define the type for `data` to avoid TypeScript error
  const { isError, error, isLoading, data } = useQuery<{ products: Product[] }, Error>({
    queryKey: ["products"],
    queryFn: FetchProducts,
  });

  // Handle loading/error states
  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading || !data) return <p>Loading...</p>;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.products.slice(firstPostIndex, lastPostIndex);



  return (
    <>

      {/* Product Grid */}
      <div className="grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentPosts.map((item) => (
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
                      e.stopPropagation(); // prevents navigating to product details when clicking button
                      addToCart(item);
                        alert("Item Added To Cart")
                    }}
                className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg transition duration-300"
              >
                ➕ Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        totalpost={data.products.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default ProductListing;
