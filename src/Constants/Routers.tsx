import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "../Components/LoginUser";
import Home from "../Pages/Home";
import AuthProtected from "../Components/AuthProtected";
import ProductDetail from "../Pages/ProductDetail";

const isAuthenticated = Boolean(localStorage.getItem("authToken"));
const router = createBrowserRouter([
  { path: "/", element: <LoginUser /> },
  {
    path: "/Home",
    element: (
      <AuthProtected isAuthenticated={isAuthenticated}>
        <Home />
      </AuthProtected>
    ),
  },
   { path: "/products/:id", element: <ProductDetail /> },
]);

function Routers(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default Routers;
