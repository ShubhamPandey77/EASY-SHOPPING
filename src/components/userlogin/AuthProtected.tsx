import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { ROUTE } from "../../constant/route.constants";

function AuthProtected() {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTE.Root} replace />; 
  }
  return <Outlet />;
}


export default AuthProtected;
