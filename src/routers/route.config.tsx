import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import LoginUser from '../pages/Login';
import Home from '../pages/Home';
import AuthProtected, { PublicRoute } from '../components/userlogin/AuthProtected';
import ProductDetail from '../pages/Product';
import Cart from '../pages/Cart';
import BuyNow from '../pages/Buy/Buy.page';
import type { JSX } from 'react';
import { ROUTE } from '../constant/route.constants';
import UserInfo from '@/pages/UserInfo';

const router = createBrowserRouter([
  { path:ROUTE.Root,
    element: <PublicRoute><LoginUser /></PublicRoute>, 
  },
  {
    element: <AuthProtected><Outlet /></AuthProtected>, 
    children: [
      { path: ROUTE.Home, element: <Home /> },
      { path: ROUTE.ProdDetailPath, element: <ProductDetail /> },
      { path: ROUTE.Cart, element: <Cart /> },
      { path: ROUTE.Buy, element: <BuyNow /> },
      { path: ROUTE.User, element: <UserInfo /> },
    ],
  },
]);

function Routers(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default Routers;
