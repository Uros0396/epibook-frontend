import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EntryPoint = () => {
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <p className="text-center">wait some seconds...</p>;
};

export default EntryPoint;
