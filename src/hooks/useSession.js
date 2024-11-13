import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../../middleware/PrivateRoute";

export const useSession = () => {
  const session = isAuth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };
  useEffect(() => {
    if (!session) {
      navigate("/");
    } else {
      navigateToHome();
    }
  }, [navigate, session]);
  return decodedSession;
};

export default useSession;
