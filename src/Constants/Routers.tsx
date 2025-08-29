import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "../Components/LoginUser";
import Home from "../Pages/Home";
import AuthProtected from "../Components/AuthProtected";
import ProductDetail from "../Pages/ProductDetail";
import Cart from "../Pages/Cart";

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
]);

function Routers(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default Routers;
