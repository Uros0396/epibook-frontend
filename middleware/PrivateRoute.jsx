import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import LoginPage from "../src/Pages/LoginPage";

const isAuth = () => {
  return JSON.parse(localStorage.getItem("Authorized"));
};

export const useSession = () => {
  const session = isAuth();
  const decodedSession = session
    ? jwtDecode(session.token, {
        header: true,
      })
    : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [navigate, session]);
  return decodedSession;
};

export const PrivateRoute = () => {
  const isAuthorized = isAuth();
  console.log(isAuthorized);
  const session = useSession();
  return isAuthorized ? <Outlet /> : <LoginPage />;
};
