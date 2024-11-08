import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
      navigate("/Home");
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <h1>Login successfully</h1>;
};

export default Success;
