import { Outlet } from "react-router-dom";
import LoginPage from "../src/Pages/LoginPage";

const isAuth = () => {
  return JSON.parse(localStorage.getItem("Authorized"));
};

const PrivateRoute = () => {
  const isAuthorized = isAuth();

  return isAuthorized ? <Outlet /> : <LoginPage />;
};
export default PrivateRoute;
