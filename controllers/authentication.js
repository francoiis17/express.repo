import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { asyncError } from "../middlewares/errorMiddleware.js";

dotenv.config();

export const usuarios = [
  {
    user: "Francisco Victor Quispe Yujra",
    email: "franciscovicqy@gmail.com",
    password: "$2a$05$2QeUb6VJ8Lpw50MZy0P12.jitwWkbfcxLiieRlXomZ7kzz6cDYeHq",
  },
];

export const login = asyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "warning", message: "Incorrect Email or Password" });
    }
    const userReq = usuarios.find((usuario) => usuario.email === email);
    if (!userReq) {
      return res
        .status(400)
        .json({ status: "warning", message: "Incorrect Email or Password" });
    }
    const loginCorrecto = await bcryptjs.compare(password, userReq.password);
    if (!loginCorrecto) {
      return res
        .status(400)
        .json({ status: "warning", message: "Incorrect Email or Password" });
    }
    const token = jsonwebtoken.sign(
      { email: userReq.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      path: "/",
    };
    res.cookie("jwt", token, cookieOption);
    return res.status(200).json({
      status: "success",
      message: `Welcome ${userReq.user}`,
      redirect: "/admin",
    });
  } catch (error) {
    res.send({
      status: "error",
      message: `error ${error}`,
    });
  }
});

export const register = asyncError(async (req, res, next) => {
  try {
    const { user, email, password } = req.body;
    if (!user || !password || !email) {
      return res
        .status(400)
        .json({ status: "warning", message: "Los campos están incompletos" });
    }
    const reqUser = usuarios.find((usuario) => usuario.email === email);
    if (reqUser) {
      return res
        .status(400)
        .json({ status: "warning", message: "Este usuario ya existe" });
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
      user,
      email,
      password: hashPassword,
    };
    usuarios.push(nuevoUsuario);
    return res.status(200).json({
      status: "success",
      message: "Usuario agregado",
      redirect: "/login",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `error ${error}`,
    });
  }
});
