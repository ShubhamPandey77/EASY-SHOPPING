import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "../Components/LoginUser";
import Home from "../Pages/Home.Page";
import AuthProtected from "../Components/AuthProtected";
import ProductDetail from "../Pages/ProductDetail.Page";
import Cart from "../Pages/Cart.Page";
import BuyNow from "../Pages/BuyNow.Page";

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
