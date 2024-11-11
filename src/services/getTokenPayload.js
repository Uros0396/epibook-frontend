import { jwtDecode } from "jwt-decode";

const getTokenPayload = (token) => {
  if (!token) {
    return null;
  }

  const payload = jwtDecode(token);
  return payload;
};

export default getTokenPayload;
