import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route.constants";


function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 h-16 md:h-18 flex items-center shadow-lg">
  <div className="flex justify-between items-center w-full px-6 md:px-12">
    
  
    <div className="flex items-center space-x-2">
    
    </div>

    <div className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-wide drop-shadow-lg cursor-pointer hover:scale-105 transform transition duration-300">
      STORE
    </div>

    <div className="flex items-center space-x-6 text-lg md:text-xl font-medium">
      <div
        className="cursor-pointer text-white hover:text-yellow-300 flex items-center gap-2 transition duration-300"
        onClick={() => navigate(ROUTE.Home)}
      >
        <FontAwesomeIcon icon={faHome} /> <span>Home</span>
      </div>
      <div
        className="cursor-pointer text-white hover:text-yellow-300 flex items-center gap-2 transition duration-300"
        onClick={() => navigate(ROUTE.Cart)}
      >
        <FontAwesomeIcon icon={faCartShopping} /> <span>Cart</span>
      </div>
    </div>
    
  </div>
</div>

  );
}

export default Navbar;
