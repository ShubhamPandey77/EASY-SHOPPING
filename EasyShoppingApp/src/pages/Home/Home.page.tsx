
import Navbar from "../../components/home/Navbar";
import ProductListing from "../../components/home/ProductListing";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProductListing />
    </div>
  );
}

export default Home;
