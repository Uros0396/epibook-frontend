import { jwtDecode } from "jwt-decode";

const getTokenPayload = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const payload = jwtDecode(token);
  return payload;
};

export default getTokenPayload;
