import getTokenPayload from "./getTokenPayload";

const isTokenExpired = (token) => {
  const payload = getTokenPayload(token);
  const currentTime = Date.now() / 1000;
  if (payload?.exp < currentTime) {
    return true;
  }
  return false;
};

export default isTokenExpired;
