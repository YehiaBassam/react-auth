import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const isLogedIn = useSelector(state => state.reducer.isLogedIn);
  return isLogedIn ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;