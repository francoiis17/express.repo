import { getConnection } from "../config/database.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/error.js";

export const getUsers = asyncError(async (req, res, next) => {
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM usuarios")
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          users: rows,
        });
      } else {
        return next(new ErrorHandler("Users do not exist", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const addUser = asyncError(async (req, res, next) => {
  const { id_usuario, cargo, correo, direccion, nombre, telefono } = req.body;
  const connection = await getConnection();
  const values = {
    id_usuario,
    cargo,
    correo,
    direccion,
    nombre,
    telefono,
  };

  await connection
    .query("INSERT INTO usuarios SET ?", values)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "User registered successfully",
        });
      } else {
        return next(new ErrorHandler("Error registering user", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const getUser = asyncError(async (req, res, next) => {
  const { id_usuario } = req.params;
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM usuarios WHERE id_usuario = ?", id_usuario)
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          user: rows,
        });
      } else {
        return next(new ErrorHandler("User not exist", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const updUser = asyncError(async (req, res, next) => {
  const { id_usuario } = req.params;
  const { cargo, correo, direccion, nombre, telefono } = req.body;
  const connection = await getConnection();
  const values = {
    cargo,
    correo,
    direccion,
    nombre,
    telefono,
  };

  await connection
    .query("UPDATE usuarios SET ? WHERE id_usuario = ?", [values, id_usuario])
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "User updated successfully",
        });
      } else {
        return next(new ErrorHandler("Error updating user", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});
