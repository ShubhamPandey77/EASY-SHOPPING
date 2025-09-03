"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route.constants";
import { clearToken } from "../../utils/auth";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate(ROUTE.Root);
    toast("Logged Out Successfully ✅");
  }

  return (
   <>
  
    <header className="bg-gradient-to-r from-black via-gray-900 to-black   shadow-lg">
      <div className="flex justify-between items-center h-12 md:h-22 px-6 md:px-12 mb-4">
      
        <Button
          variant="secondary"
          className="rounded-xl bg-gray-200 text-gray-900 hover:bg-gray-300"
          onClick={handleLogout}
        >
          Log Out
        </Button>

 
        <div
          className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-wide drop-shadow-lg cursor-pointer hover:scale-105 transform transition duration-300"
          onClick={() => navigate(ROUTE.Home)}
        >
          Easy Shopping.Com
        </div>

         <nav className="flex items-center space-x-4 md:space-x-6 text-white font-medium">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white hover:text-yellow-300 hover:bg-transparent"
            onClick={() => navigate(ROUTE.Home)}
          >
            <FontAwesomeIcon icon={faHome} /> <span>Home</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white hover:text-yellow-300 hover:bg-transparent"
            onClick={() => navigate(ROUTE.Cart)}
          >
            <FontAwesomeIcon icon={faCartShopping} /> <span>Cart</span>
          </Button>
        </nav>
      </div>
    </header>
    </>
   
  );
}

export default Navbar;
