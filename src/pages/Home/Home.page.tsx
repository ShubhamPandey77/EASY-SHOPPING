
import Navbar from "../../components/home/Navbar";
import ProductListing from "../../components/home/ProductListing";
import { motion } from "motion/react"

//TODO: remove px and use rems -> Removed px and rem from the codes.
function Home() {
  return (
    <div>
      <Navbar />
      <motion.div className="relative w-full">
        <img
          className="w-full h-40 object-cover md:h-56 lg:h-72  shadow-lg"
          src="/Homepage-body.jpg"
          alt="Homepage banner"
        />
        <div className="absolute top-8 left-8 md:top-12 md:left-12 max-w-lg text-white drop-shadow-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Welcome to Easy Shopping!
          </h1>
          <p className="text-base md:text-lg lg:text-xl mt-3 font-medium drop-shadow-md">
            Best deals, discounts & offers with ease 😍..!
          </p>
        </div>
      </motion.div>


      <ProductListing />
    </div>
  );
}

export default Home;
