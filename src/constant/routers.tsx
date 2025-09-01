import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "../components/userlogin/LoginUser";
import Home from "../pages/Home/Home.page";
import AuthProtected from "../components/userlogin/AuthProtected";
import ProductDetail from "../pages/Product/ProductDetail.page";
import Cart from "../pages/Cart/Cart.page";
import BuyNow from "../pages/Buy/Buy.page";
import type { JSX } from "react";

// We check for token in a function instead of top-level constant
function isUserAuthenticated(): boolean {
  return Boolean(localStorage.getItem("authToken"));
}

const router = createBrowserRouter([
  { path: "/", element: <LoginUser /> },
  {
    path: "/home",
    element: (
      <AuthProtected isAuthenticated={isUserAuthenticated()}>
        <Home />
      </AuthProtected>
    ),
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
    {
    path: "/buy",
    element: <BuyNow />,
  },
]);

function Routers(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default Routers;
