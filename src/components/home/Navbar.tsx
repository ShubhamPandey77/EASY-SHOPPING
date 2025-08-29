import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ProductListing from "./ProductListing";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 h-[60px] flex items-center shadow-md">
      <div className="flex justify-between items-center w-full px-8">
        {/* Search Box */}
        <div className="flex items-center space-x-2">
          
         
        </div>

        {/* Store Name */}
        <div className="font-extrabold text-3xl text-white tracking-wide drop-shadow-md cursor-pointer hover:scale-105 transition">
          STORE
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-lg font-medium">
          <div
            className="mr-6  cursor-pointer text-white hover:text-yellow-300 flex items-center gap-2 transition"
            onClick={() => navigate("/home")}
          >
            <FontAwesomeIcon icon={faHome} /> <span>Home {" "} </span>
          </div>
          <div
            className="cursor-pointer text-white hover:text-yellow-300 flex items-center gap-2 transition"
            onClick={() =>navigate('/cart')}
          >
            <FontAwesomeIcon icon={faCartShopping} /> <span>Cart </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
