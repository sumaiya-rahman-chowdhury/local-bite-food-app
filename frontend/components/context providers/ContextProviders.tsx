import AuthProvider from "./AuthProvider";
import { CartProvider } from "./CartProvider";

function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

export default ContextProviders;
