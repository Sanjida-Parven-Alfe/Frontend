import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useDecorator from "../hooks/useDecorator";

const DecoratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isDecorator, isDecoratorLoading] = useDecorator();
  const location = useLocation();

  if (loading || isDecoratorLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-brand-teal"></span>
      </div>
    );
  }

  if (user && isDecorator) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default DecoratorRoute;
