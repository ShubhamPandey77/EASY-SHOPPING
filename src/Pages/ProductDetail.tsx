import { useQuery } from "@tanstack/react-query";
import FetchProductById from "../API/ProductDetailAPI";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

function ProductDetail() {
  const { id } = useParams();

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["productId", id],
    queryFn: () => FetchProductById(id as string),
    enabled: !!id,
  });

  if (!id) return <p>Invalid product ID.</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (isLoading) return <p>Loading....</p>;
  if (!data) return <p>No product found.</p>;

  console.log("Product ID:", id);
  console.log("Fetched Data:", data);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-lg p-6 transition-all duration-500">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full md:w-[300px] h-[300px] object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          />
          <div className="flex-1 space-y-4">
            <h2 className="font-bold text-4xl text-gray-900">{data.title}</h2>
            <p className="text-gray-700 text-lg">{data.description}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-800">
              <p>
                <strong>Category:</strong> {data.category}
              </p>
              <p>
                <strong>Brand:</strong> {data.brand}
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
                <strong>Stock Left:</strong> {data.stock}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
  <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
    Add To Cart
  </button>
  <button className="px-8 py-4 bg-rose-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-rose-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
    Buy Now
  </button>
</div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-xl shadow-lg p-6 space-y-4 animate-fade-in">
          <h4 className="text-2xl font-semibold text-gray-800">
            <strong>Brand Name:</strong> {data.brand}
          </h4>
          <h4 className="text-2xl text-gray-700">
            <strong>SKU:</strong> {data.sku}
          </h4>
          <h4 className="text-2xl text-gray-700">
            <strong>Weight:</strong> {data.weight} KG
          </h4>
          <h4 className="text-2xl text-gray-700">
            <strong>Dimensions (W x H x D):</strong> {data.dimensions.width} x{" "}
            {data.dimensions.height} x {data.dimensions.depth}
          </h4>
          <h4 className="text-2xl text-gray-700">
            <strong>Warranty Information:</strong> {data.warrantyInformation}
          </h4>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
