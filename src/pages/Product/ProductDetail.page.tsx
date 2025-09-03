import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/product-api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";
import { ROUTE } from "../../constant/route.constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category ?: string;
  thumbnail: string;
  reviewerName?: string;
  sku?: string;
  weight?: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["productId", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });

  if (!id) return <p>Invalid product ID.</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No product found.</p>;

  return (
    <>
     
      <Navbar />

      <div className="bg-white text-black min-h-screen p-4 md:p-8 space-y-8">
      
        <Card className="bg-white text-black border rounded-xl shadow-md p-4 md:p-6">
          <CardContent className="flex flex-col md:flex-row gap-6 md:gap-10">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full md:w-80 h-64 md:h-72 object-cover rounded-lg border"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {data.title}
                </h2>
                <p className="text-black text-base md:text-lg">{data.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-black text-sm md:text-base">
                  <p>
                    <strong>Category:</strong> {data.category ?? "N/A"}
                  </p>
                  <p>
                    <strong>Reviewer:</strong> {data.reviewerName ?? "N/A"}
                  </p>
                  <p>
                    <strong>Price:</strong> ${data.price ?? "N/A"}
                  </p>
                  <p>
                    <strong>Discount:</strong> {data.discountPercentage ?? "N/A"}%
                  </p>
                  <p>
                    <strong>Rating:</strong> {data.rating ?? "N/A"} / 5
                  </p>
                  <p>
                    <strong>Stock:</strong> {data.stock ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(data);
                    toast.success("Item Successfully Added To Cart ✅");
                  }}
                  className="w-auto bg-black text-white text-base font-medium rounded-lg py-2 px-6 hover:bg-gray-800"
                >
                  Add To Cart
                </Button>
                <Button
                  onClick={() => navigate(ROUTE.Buy)}
                  className="w-auto bg-black text-white text-base font-medium rounded-lg py-2 px-6 hover:bg-gray-800"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white text-black border rounded-xl shadow-md p-4 md:p-6 space-y-4">
          <h4 className="text-lg md:text-xl font-semibold text-black">
            <strong>Brand:</strong> {data.brand ?? "N/A"}
          </h4>
          <h4 className="text-base md:text-lg text-black">
            <strong>SKU:</strong> {data.sku ?? "N/A"}
          </h4>
          <h4 className="text-base md:text-lg text-black">
            <strong>Weight:</strong> {data.weight ? `${data.weight} KG` : "N/A"}
          </h4>
          <h4 className="text-base md:text-lg text-black">
            <strong>Dimensions (W ✖️ H ✖️ D):</strong>{" "}
            {data.dimensions?.width} ✖️ {data.dimensions?.height} × {data.dimensions?.depth}
          </h4>
          <h4 className="text-base md:text-lg text-black">
            <strong>Warranty:</strong> {data.warrantyInformation ?? "N/A"}
          </h4>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;
