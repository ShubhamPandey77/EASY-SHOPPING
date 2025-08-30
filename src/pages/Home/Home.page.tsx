
import Navbar from "../../components/home/Navbar";
import ProductListing from "../../components/home/ProductListing";
import { motion } from "motion/react"

function Home() {
  return (
    <div>
      <Navbar />
    <motion.div className="relative w-full">
  <img className="w-full h-[500px] object-cover" src="/Homepage-body.jpg" alt="#" />
  <div className="absolute top-8 left-8 max-w-md text-white text-5xl font-bold drop-shadow-lg">
    Welcome to Easy Shopping!
    <p className="text-lg mt-3 font-medium drop-shadow-md">
      Best deals, discounts & offers with ease 😍..!
    </p>
  </div>
</motion.div>


      <ProductListing />
    </div>
  );
}

export default Home;
