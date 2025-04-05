import { Navigate } from "react-router-dom";
import { getFromStorage } from "../services/storage/Storage";
import { memo } from "react";

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = getFromStorage("user");
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default memo(PrivateRoute);
