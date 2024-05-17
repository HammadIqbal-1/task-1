import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const Protected = () => {
  const token = useAuth();
  return <div>{token ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default Protected;
