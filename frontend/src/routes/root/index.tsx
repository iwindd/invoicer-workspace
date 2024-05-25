import React from "react";
import Layout from "../../layouts";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { paths } from "../../config";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isFetching, userData } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isFetching) {
      setIsLoading(false);
    }

  }, [isFetching]);

  if (isLoading) {
    return <Outlet />;
  }

  return userData != null ? <Outlet /> : <Navigate to={paths.signIn} />;
};

const Root = () => {
  return (
    <Layout>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    </Layout>
  );
};

export default Root;
