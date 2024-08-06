import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "../controllers/authentication.js";

dotenv.config();

export const soloAdmin = (req, res, next) => {
  const logueado = isAuthenticated(req);
  if (logueado) return next();
  return res.redirect("/");
};

export const soloPublico = (req, res, next) => {
  const logueado = isAuthenticated(req);
  if (!logueado) return next();
  return res.redirect("/admin");
};

const isAuthenticated = (req) => {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decode = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const reqUser = usuarios.find((usuario) => usuario.email === decode.email);
    if (!reqUser) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
