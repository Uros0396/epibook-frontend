import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("Authorized", JSON.stringify(token));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <h1>Login successfully</h1>;
};

export default Success;
