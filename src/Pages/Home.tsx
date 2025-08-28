import Navbar from "../Components/Navbar";
import ProductListing from "../Components/ProductListing";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative w-full ">
        <img className="w-full h-[500px]" src="/Homepage-body.jpg" alt="#" />
        <div className="absolute top-8 left-8 text-white text-5xl font-bold">
          Welcome to Easy Shopping!
          <p className="text-lg mt-3 font-medium drop-shadow-md">
            Best deals, discounts & offers with ease 😍..!
          </p>
        </div>
      </div>

      <ProductListing />
    </div>
  );
}

export default Home;
