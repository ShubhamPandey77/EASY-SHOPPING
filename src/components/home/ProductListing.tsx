import { useState } from "react";
import { fetchProductByLimit } from "../../api/product-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";
import { ROUTE } from "../../constant/route.constants";
import CustomPagination from "./Pagination";
import { limit } from "../../constant/values.contants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronDown, Filter, Star, ShoppingCart, Eye, Package, TrendingUp } from "lucide-react";

function ProductListing() {
  const { addToCart } = useCart();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<
    "title" | "price" | "rating" | "stock"
  >("title");

  const navigate = useNavigate();

  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["products", page, limit, querySearch, order, sortBy],
    queryFn: () =>
      fetchProductByLimit(page, limit, querySearch, order, sortBy),
  });

  const sortOptions = [
    { field: "title", label: "Name", icon: Package },
    { field: "price", label: "Price", icon: TrendingUp },
    { field: "rating", label: "Rating", icon: Star },
    { field: "stock", label: "Stock", icon: Package },
  ];

  const getCurrentSortLabel = () => {
    const field = sortOptions.find(option => option.field === sortBy);
    return `${field?.label} (${order === "asc" ? "Low to High" : "High to Low"})`;
  };

  // Enhanced Star Rating Component
  const StarRating = ({ rating, totalStars = 5, size = "sm" }: { 
    rating: number; 
    totalStars?: number; 
    size?: "sm" | "md" | "lg" 
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
      <div className="flex items-center gap-1">
        {stars}
        <span className={`ml-2 font-medium ${size === 'sm' ? 'text-sm' : 'text-base'} text-gray-600`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Enhanced stock badge with better colors
  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge className="text-xs bg-red-100 text-red-800 border-red-200">Out of Stock</Badge>;
    } else if (stock < 10) {
      return <Badge className="text-xs bg-orange-100 text-orange-800 border-orange-200">Low Stock</Badge>;
    } else if (stock < 20) {
      return <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">Limited</Badge>;
    }
    return <Badge className="text-xs bg-green-100 text-green-800 border-green-200">In Stock</Badge>;
  };

  // Enhanced Skeleton Components
  const ProductSkeleton = () => (
    <Card className="bg-white border border-gray-200/80 overflow-hidden rounded-2xl shadow-sm">
      <div className="aspect-square">
        <Skeleton className="w-full h-full rounded-t-2xl" />
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
          <Skeleton className="h-4 w-12 ml-2" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="w-full h-11 rounded-xl" />
      </CardContent>
    </Card>
  );

  const HeaderSkeleton = () => (
    <div className="bg-white border-b border-gray-200/80 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 w-24 rounded-xl" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-52 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-medium">Error: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderSkeleton />
        
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-gray-200/80 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find everything you need from our curated collection of quality products
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            {/* Enhanced Search Section */}
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-12 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 transition-all duration-200 rounded-xl text-base shadow-sm"
                />
              </div>
              <Button
                onClick={() => {
                  setPage(1);
                  setQuerySearch(search);
                }}
                size="lg"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 font-semibold"
              >
                Search
              </Button>
            </div>

            {/* Enhanced Sort Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="h-5 w-5" />
                <span className="text-sm font-semibold">Sort by</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[220px] justify-between bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 h-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {getCurrentSortLabel()}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-white border border-gray-200 shadow-xl rounded-2xl p-2" align="end">
                  <DropdownMenuLabel className="font-bold text-gray-900 text-base px-4 py-3 text-center">
                    Sort Products
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  
                  {sortOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <div key={option.field} className="space-y-1 p-2">
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                          <IconComponent className="h-3 w-3" />
                          {option.label}
                        </DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={sortBy === option.field ? order : ""}
                          onValueChange={(value) => {
                            setSortBy(option.field as "title" | "price" | "rating" | "stock");
                            setOrder(value as "asc" | "desc");
                          }}
                        >
                          <DropdownMenuRadioItem 
                            value="asc" 
                            className="cursor-pointer rounded-xl mx-1 py-2 text-sm font-medium hover:bg-blue-50 focus:bg-blue-50"
                          >
                            {option.field === "title" ? "A to Z" : "Low to High"}
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem 
                            value="desc" 
                            className="cursor-pointer rounded-xl mx-1 py-2 text-sm font-medium hover:bg-blue-50 focus:bg-blue-50"
                          >
                            {option.field === "title" ? "Z to A" : "High to Low"}
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        {index !== sortOptions.length - 1 && (
                          <DropdownMenuSeparator className="bg-gray-100 my-3" />
                        )}
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.products?.length ? (
            data.products.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-2xl">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      item.stock === 0 ? 'grayscale opacity-60' : ''
                    }`}
                  />
                  
                  {/* Out of stock overlay */}
                  {item.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
                  
                  {/* Enhanced overlay buttons */}
                  {item.stock > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/95 text-gray-900 hover:bg-white shadow-lg rounded-full h-10 px-4 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(ROUTE.ProdDetail(item.id));
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full h-10 px-4 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                            toast.success("Added to cart! 🛒", {
                              duration: 2000,
                              style: {
                                background: '#10B981',
                                color: '#fff',
                              },
                            });
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Enhanced stock badge */}
                  <div className="absolute top-4 left-4">
                    {getStockBadge(item.stock || 0)}
                  </div>

                  {/* Discount badge */}
                  {item.discountPercentage && item.discountPercentage > 0 && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white text-xs font-bold border-0">
                        -{Math.round(item.discountPercentage)}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent 
                  className="p-6 space-y-4"
                  onClick={() => navigate(ROUTE.ProdDetail(item.id))}
                >
                  <div className="space-y-2">
                    <h2 className={`font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors duration-200 ${
                      item.stock === 0 ? 'text-gray-500' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h2>
                    <p className={`text-sm line-clamp-2 leading-relaxed ${
                      item.stock === 0 ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Enhanced rating display */}
                  {item.rating && item.rating > 0 && (
                    <div className="flex items-center justify-between">
                      <StarRating rating={item.rating} size="sm" />
                    </div>
                  )}

                  {/* Enhanced price display */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className={`font-bold text-2xl ${
                        item.stock === 0 ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        ${item.price}
                      </h3>
                      {item.discountPercentage && item.discountPercentage > 0 && (
                        <span className="text-gray-500 text-sm line-through">
                          ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.stock > 0) {
                        addToCart(item);
                        toast.success("Added to cart! 🛒", {
                          duration: 2000,
                          style: {
                            background: '#10B981',
                            color: '#fff',
                          },
                        });
                      }
                    }}
                    className={`w-full font-semibold rounded-xl h-11 shadow-sm transition-all duration-200 ${
                      item.stock === 0
                        ? 'bg-gray-400 text-white cursor-not-allowed hover:bg-gray-400'
                        : 'bg-gray-900 text-white hover:bg-black hover:shadow-md'
                    }`}
                    disabled={item.stock === 0}
                  >
                    {item.stock === 0 ? (
                      "Out of Stock"
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-gray-300 text-8xl mb-6">🔍</div>
              <h3 className="text-gray-600 text-2xl font-bold mb-2">No products found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {data?.products?.length > 0 && (
          <div className="mt-16 flex justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/80">
              <CustomPagination
                page={page}
                setPage={setPage}
                data={data}
                limit={limit}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductListing;