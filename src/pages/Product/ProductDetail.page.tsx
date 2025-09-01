import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/product-api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import useCart from "../../hooks/useCart";
import toast, { Toaster } from "react-hot-toast";
import { ROUTE } from "../../constant/route.constants";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["productId", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });

  if (!id) return <p>Invalid product ID.</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No product found.</p>;

  return (
    <>
      <Toaster />
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6 md:p-12 space-y-10">
        {/* Product Main Info */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-500">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full md:w-96 h-64 md:h-80 object-cover rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {data.title}
              </h2>
              <p className="text-gray-700 text-base md:text-lg">{data.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-800 text-sm md:text-base">
                <p>
                  <strong>Category:</strong> {data.category}
                </p>
                <p>
                  <strong>Reviewer:</strong> {data.reviewerName}
                </p>
                <p>
                  <strong>Price:</strong> ${data.price}
                </p>
                <p>
                  <strong>Discount:</strong> {data.discountPercentage}%
                </p>
                <p>
                  <strong>Rating:</strong> {data.rating} / 5
                </p>
                <p>
                  <strong>Stock:</strong> {data.stock}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(data);
                  toast.success("Item Successfully Added To Cart ✅");
                }}
                className="px-6 md:px-8 py-3 bg-indigo-600 text-white text-base md:text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                Add To Cart
              </button>
              <button
                onClick={() => navigate(ROUTE.Buy)}
                className="px-6 md:px-8 py-3 bg-rose-600 text-white text-base md:text-lg font-semibold rounded-lg shadow-md hover:bg-rose-700 hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Additional Product Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4 animate-fade-in">
          <h4 className="text-xl md:text-2xl font-semibold text-gray-800">
            <strong>Brand:</strong> {data.reviewerName}
          </h4>
          <h4 className="text-lg md:text-xl text-gray-700">
            <strong>SKU:</strong> {data.sku}
          </h4>
          <h4 className="text-lg md:text-xl text-gray-700">
            <strong>Weight:</strong> {data.weight} KG
          </h4>
          <h4 className="text-lg md:text-xl text-gray-700">
            <strong>Dimensions (W × H × D):</strong> {data.dimensions.width} × {data.dimensions.height} × {data.dimensions.depth}
          </h4>
          <h4 className="text-lg md:text-xl text-gray-700">
            <strong>Warranty:</strong> {data.warrantyInformation}
          </h4>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
