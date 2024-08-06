import { getConnection } from "../config/database.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/error.js";

export const changeStatus = asyncError(async (req, res, next) => {
  const { Id } = req.params;
  const connection = await getConnection();

  await connection
    .query("UPDATE ordenes SET estado = 'completed' WHERE Id = ?", [Id])
    .then(([result]) => {
      if (result.affectedRows === 1) {
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

export const getAllOrders = asyncError(async (req, res, next) => {
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM ordenes")
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          orders: rows,
        });
      } else {
        return next(new ErrorHandler("Orders do not exist", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const addOrder = asyncError(async (req, res, next) => {
  const {
    id_usuario,
    usuario,
    adicional,
    canal,
    comentario,
    current,
    distribuidor,
    fecha,
    monto,
    placa,
    ruta,
    estado,
  } = req.body;
  const connection = await getConnection();
  const values = {
    id_usuario,
    usuario,
    adicional,
    canal,
    comentario,
    current,
    distribuidor,
    fecha,
    monto,
    placa,
    ruta,
    estado,
  };

  await connection
    .query("INSERT INTO ordenes SET ?", values)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "Orden registrado exitosamente",
        });
      } else {
        return next(new ErrorHandler("Error al registrar la orden", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const getOrders = asyncError(async (req, res, next) => {
  const { id_usuario } = req.params;
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM ordenes WHERE id_usuario = ?", id_usuario)
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          orders: rows,
        });
      } else {
        return next(new ErrorHandler("No existen ordenes", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const getOrder = asyncError(async (req, res, next) => {
  const { Id } = req.params;
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM ordenes WHERE Id = ?", Id)
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          order: rows,
        });
      } else {
        return next(new ErrorHandler("La orden no existe", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const updOrder = asyncError(async (req, res, next) => {
  const { Id } = req.params;
  const {
    adicional,
    canal,
    comentario,
    current,
    distribuidor,
    fecha,
    monto,
    placa,
    ruta,
  } = req.body;
  const connection = await getConnection();
  const values = {
    adicional,
    canal,
    comentario,
    current,
    distribuidor,
    fecha,
    monto,
    placa,
    ruta,
  };

  await connection
    .query("UPDATE ordenes SET ? WHERE Id = ?", [values, Id])
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "Orden actualizado exitosamente",
        });
      } else {
        return next(new ErrorHandler("Error al actualizar la orden", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});
