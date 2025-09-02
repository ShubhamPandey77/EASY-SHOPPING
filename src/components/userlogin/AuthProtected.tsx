import { Navigate} from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { ROUTE } from "../../constant/route.constants";

function AuthProtected({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTE.Root} replace />; 
  }
  return <>{children}</>;
}
export function PublicRoute({ children }: { children: React.ReactNode }){
 
    if (isAuthenticated()) {
    return <Navigate to={ROUTE.Home} replace />;
  }
  return <>{children}</>;
}

export default AuthProtected;
