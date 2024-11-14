import { jwtDecode } from "jwt-decode";

const getTokenPayload = () => {
  const token = localStorage.getItem("Authorized");
  if (!token) {
    return null;
  }

  const payload = jwtDecode(token);
  return payload;
};

export default getTokenPayload;
