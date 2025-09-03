import Routers from "./routers";
import { CartProvider } from "./contexts/CartContext.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Toaster/>
        <Routers />
      </CartProvider>
    </QueryClientProvider>
      
    </div>
  );
}

export default App;
