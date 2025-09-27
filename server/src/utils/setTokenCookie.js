import jwt from "jsonwebtoken";
import ENV from "../config/index.js";

const setTokenCookie = (user, res) => {
  const token = jwt.sign(
    { id: user._id, admin: user.isAdmin ?? false },
    ENV.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
export default setTokenCookie;
