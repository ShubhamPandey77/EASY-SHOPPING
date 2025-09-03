import { useState } from "react";
import { fetchProductByLimit } from "../../api/product-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";
import { ROUTE } from "../../constant/route.constants";
import CustomPagination from "./Pagination";
import HeroBanner from "./Hero.Banner";
import { limit } from "../../constant/values.contants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

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

  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
    
      <HeroBanner />

 
      <div className="flex bg-white text-black">
  
        <aside className="w-64 bg-black text-white p-6 shadow-lg flex flex-col gap-6">
          <h2 className="text-xl font-bold">Filters</h2>

     
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-gray-400 bg-white text-black"
            />
            <Button
              onClick={() => {
                setPage(1);
                setQuerySearch(search);
              }}
              className="w-full bg-white text-black hover:bg-gray-200 rounded-lg"
            >
              🔍 Search
            </Button>
          </div>

      
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-white text-black border border-gray-300"
              >
                Order By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-semibold">
                Select Sorting
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {["title", "price", "rating", "stock"].map((field) => (
                <div key={field} className="px-2 py-1">
                  <p className="text-sm font-medium capitalize">{field}</p>
                  <div className="flex gap-2 mt-1">
                    <Button
                      size="sm"
                      variant={
                        sortBy === field && order === "asc"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setSortBy(
                          field as "title" | "price" | "rating" | "stock"
                        );
                        setOrder("asc");
                      }}
                    >
                      Asc
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        sortBy === field && order === "desc"
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setSortBy(
                          field as "title" | "price" | "rating" | "stock"
                        );
                        setOrder("desc");
                      }}
                    >
                      Desc
                    </Button>
                  </div>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>

       
        <main className="flex-1 p-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {data?.products?.length ? (
              data.products.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => navigate(ROUTE.ProdDetail(item.id))}
                  className="cursor-pointer border border-gray-300 bg-white hover:shadow-2xl transition-transform hover:scale-105 w-80"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-52 object-cover border-b border-gray-200"
                  />
                  <CardContent className="p-5 flex flex-col gap-3">
                    <h2 className="font-semibold text-lg truncate">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <h3 className="text-black font-bold text-xl">
                      ${item.price}
                    </h3>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        toast.success("Item Successfully Added To Cart ✅");
                      }}
                      className="w-full bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                      ➕ Add To Cart
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )}
          </div>

         
          <div className="mt-10 flex justify-center">
            <CustomPagination
              page={page}
              setPage={setPage}
              data={data}
              limit={limit}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductListing;
