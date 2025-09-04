import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/product-api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";
import { ROUTE } from "../../constant/route.constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  ArrowLeft,
  Package,
  Ruler,
  Weight,
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye
} from "lucide-react";
import { useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["productId", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });

  // Star Rating Component
  const StarRating = ({ rating, totalStars = 5, size = "lg", showNumber = true }: { 
    rating: number; 
    totalStars?: number; 
    size?: "sm" | "md" | "lg"; 
    showNumber?: boolean;
  }) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    };

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} 
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className={`relative ${sizeClasses[size]}`}>
          <Star className={`${sizeClasses[size]} text-gray-300 fill-gray-300 absolute`} />
          <div className="overflow-hidden w-1/2">
            <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className={`${sizeClasses[size]} text-gray-300 fill-gray-300`} 
        />
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {stars}
        </div>
        {showNumber && (
          <span className="text-lg font-semibold text-gray-700">
            {rating.toFixed(1)} <span className="text-gray-500">({Math.floor(Math.random() * 500) + 50} reviews)</span>
          </span>
        )}
      </div>
    );
  };


  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: "Out of Stock", color: "bg-red-100 text-red-700", icon: AlertCircle };
    if (stock < 10) return { status: "Low Stock", color: "bg-orange-100 text-orange-700", icon: Clock };
    if (stock < 20) return { status: "Limited Stock", color: "bg-yellow-100 text-yellow-700", icon: Package };
    return { status: "In Stock", color: "bg-green-100 text-green-700", icon: CheckCircle };
  };

 
  const ProductSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
     
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
      
          <div className="space-y-4">
            <Skeleton className="w-full aspect-square rounded-2xl" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

       
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-6 rounded" />
                ))}
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-6 w-20" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>

      
        <div className="mt-16 space-y-8">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-60 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-medium">Invalid product ID</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-medium">Error: {(error as Error).message}</p>
          <Button 
            onClick={() => navigate(-1)} 
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return <ProductSkeleton />;
  }

  const stockStatus = getStockStatus(data.stock || 0);
  const StockIcon = stockStatus.icon;
  

  const productImages = data.images || [data.thumbnail, data.thumbnail, data.thumbnail, data.thumbnail];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <span> ›
          </span>
          <span className="text-gray-900 font-medium">{data.category}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={productImages[selectedImageIndex]}
                alt={data.title}
                className="w-full aspect-square object-cover rounded-2xl bg-gray-100 shadow-xl"
              />
              {data.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
                  <div className="bg-white/90 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    OUT OF STOCK
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${data.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-700">
                {data.category}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {data.title}
              </h1>
              <p className="text-gray-600 mt-2">Brand: {data.brand || "Generic"}</p>
            </div>

            {/* Rating */}
            {data.rating && data.rating > 0 && (
              <StarRating rating={data.rating} size="lg" />
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${data.price}
                </span>
                {data.discountPercentage && data.discountPercentage > 0 && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="bg-red-500">
                      -{data.discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Badge className={stockStatus.color}>
                <StockIcon className="h-4 w-4 mr-1" />
                {stockStatus.status}
              </Badge>
              {data.stock > 0 && data.stock <= 20 && (
                <span className="text-sm text-gray-600">
                  Only {data.stock} left in stock!
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-gray">
              <p className="text-gray-700 text-lg leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => {
                  if (data.stock > 0) {
                    addToCart(data);
                    toast.success("Added to cart! 🛒", {
                      duration: 2000,
                      style: {
                        background: '#10B981',
                        color: '#fff',
                      },
                    });
                  }
                }}
                disabled={data.stock === 0}
                className={`flex-1 min-w-[200px] h-14 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                  data.stock === 0
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl'
                }`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {data.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              
              <Button
                onClick={() => navigate(ROUTE.Buy)}
                disabled={data.stock === 0}
                className="flex-1 min-w-[200px] h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Buy Now
              </Button>

              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                variant="outline"
                size="lg"
                className="h-14 w-14 rounded-xl border-2"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 w-14 rounded-xl border-2"
                onClick={() => {
                  navigator.share?.({
                    title: data.title,
                    text: data.description,
                    url: window.location.href,
                  }) || navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <Truck className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Cards */}
        <div className="mt-16 space-y-8">
          {/* Specifications */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="h-6 w-6 text-blue-600" />
                Product Specifications
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">SKU</span>
                    <span className="text-gray-900 font-semibold">{data.sku || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Brand</span>
                    <span className="text-gray-900 font-semibold">{data.brand || "Generic"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Category</span>
                    <span className="text-gray-900 font-semibold">{data.category || "N/A"}</span>
                  </div>
                </div>

                {data.dimensions && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Dimensions
                    </h4>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Width</span>
                      <span className="text-gray-900 font-semibold">{data.dimensions.width || "N/A"} cm</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Height</span>
                      <span className="text-gray-900 font-semibold">{data.dimensions.height || "N/A"} cm</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Depth</span>
                      <span className="text-gray-900 font-semibold">{data.dimensions.depth || "N/A"} cm</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {data.weight && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium flex items-center gap-2">
                        <Weight className="h-4 w-4" />
                        Weight
                      </span>
                      <span className="text-gray-900 font-semibold">{data.weight} kg</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Stock</span>
                    <span className="text-gray-900 font-semibold">{data.stock || 0} units</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Rating</span>
                    <span className="text-gray-900 font-semibold">{data.rating || "N/A"} / 5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warranty & Shipping */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Award className="h-6 w-6 text-green-600" />
                  Warranty Information
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {data.warrantyInformation || "Standard manufacturer warranty applies. Contact customer service for specific terms and conditions."}
                  </p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Full warranty coverage</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Truck className="h-6 w-6 text-blue-600" />
                  Shipping Information
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {data.shippingInformation || "Free standard shipping on orders over $50. Express shipping available at checkout."}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Free shipping over $50</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Express delivery available</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Tracking included</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Section */}
          {data.reviews && data.reviews.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-600" />
                  Customer Reviews
                </h3>
                <div className="space-y-6">
                  {data.reviews.slice(0, 3).map((review: any, index: number) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {review.reviewerName?.[0] || "A"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{review.reviewerName || "Anonymous"}</p>
                          <StarRating rating={review.rating || 5} size="sm" showNumber={false} />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment || "Great product!"}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.date || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;