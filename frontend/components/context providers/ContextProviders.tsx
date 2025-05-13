import AuthProvider from "./AuthProvider";

function ContextProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ContextProviders;
