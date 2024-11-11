import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isTokenExpired from "../services/isTokenExpired.js";

const EntryPoint = () => {
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      navigate("home");
    } else {
      navigate("login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <p className="text-center">wait some seconds...</p>;
};

export default EntryPoint;
