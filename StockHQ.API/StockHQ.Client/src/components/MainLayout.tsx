import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
