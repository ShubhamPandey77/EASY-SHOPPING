"use client";

import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route.constants";
import { clearToken } from "../../utils/auth";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, ShoppingCart, LogOut, Settings, Home, Store } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate(ROUTE.Root);
    toast.success("Logged Out Successfully ✅");
  }

  const userInitials = "ES"; 
  const userEmail = "emilys@gmail.com";

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-18 px-6 py-3">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate(ROUTE.Home)}
          >
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                Easy Shopping
              </span>
              <span className="text-blue-600 font-bold text-xl">.com</span>
            </div>
          </div>

          {/* Navigation Links & User Menu */}
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-xl px-4 py-2 h-10"
              onClick={() => navigate(ROUTE.Home)}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-xl px-4 py-2 h-10"
              onClick={() => navigate(ROUTE.Cart)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Cart</span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-xl border-2 border-transparent hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User avatar" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-xl"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-900">
                      My Account
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-100" />

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-lg mx-2 my-1"
                  onClick={() => {
                    toast("Profile page coming soon!", {
                      icon: 'ℹ️',
                      duration: 3000,
                    });
                  }}
                >
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">Account Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-lg mx-2 my-1"
                  onClick={() => navigate(ROUTE.Cart)}
                >
                  <ShoppingCart className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">Go to Cart</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-lg mx-2 my-1"
                  onClick={() => {
                    toast("Settings page coming soon!", {
                      icon: '⚙️',
                      duration: 3000,
                    });
                  }}
                >
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-100 mx-2" />

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600 rounded-lg mx-2 my-1 mb-2"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;