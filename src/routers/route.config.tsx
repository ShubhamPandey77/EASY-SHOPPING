import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginUser from '../pages/Login';
import Home from '../pages/Home';
import AuthProtected from '../components/userlogin/AuthProtected';
import ProductDetail from '../pages/Product';
import Cart from '../pages/Cart';
import BuyNow from '../pages/Buy/Buy.page';
import type { JSX } from 'react';
import { isAuthenticated } from '../utils/auth';
import { ROUTE } from '../constant/route.constants';
import { PublicRoute } from '../components/userlogin/AuthProtected';


// TODO: remove this function and use which is inside utils -> Done
isAuthenticated();
const router = createBrowserRouter([
  {
    path: ROUTE.Root,
    element: (
      <PublicRoute>
        <LoginUser />
      </PublicRoute>
    ),
  },
  {
    element: <AuthProtected />, // no comma issue here
    children: [
      { path: ROUTE.Home, element: <Home /> },
      { path: ROUTE.ProdDetailPath, element: <ProductDetail /> },
      { path: ROUTE.Cart, element: <Cart /> },
      { path: ROUTE.Buy, element: <BuyNow /> },
    ],
  },
]);

function Routers(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default Routers;
