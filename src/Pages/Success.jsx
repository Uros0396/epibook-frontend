import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search);
    const token = searchParam.get("token");

    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
      setTimeout(() => {
        navigate("/Home");
      }, 2000);
    }
  }, [location, navigate]);

  return <h1>Login successfully</h1>;
};

export default Success;
