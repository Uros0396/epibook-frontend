import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../../middleware/PrivateRoute";

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
