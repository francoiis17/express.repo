import { getConnection } from "../config/database.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/error.js";

export const addProduct = asyncError(async (req, res, next) => {
  const { id_usuario, centro, norte, otro, placa, sur } = req.body;
  const connection = await getConnection();
  const values = {
    id_usuario,
    centro,
    norte,
    otro,
    placa,
    sur,
  };

  await connection
    .query("INSERT INTO productos SET ?", values)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "Product registered successfully",
        });
      } else {
        return next(new ErrorHandler("Error registering product", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const getProduct = asyncError(async (req, res, next) => {
  const { id_usuario } = req.params;
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM productos WHERE id_usuario = ?", id_usuario)
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          product: rows,
        });
      } else {
        return next(new ErrorHandler("Product not exist", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const updProduct = asyncError(async (req, res, next) => {
  const { id_usuario } = req.params;
  const {centro, norte, otro, placa, sur } = req.body;
  const connection = await getConnection();
  const values = {
    centro,
    norte,
    otro,
    placa,
    sur,
  };

  await connection
    .query("UPDATE productos SET ? WHERE id_usuario = ?", [values, id_usuario])
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "Product updated successfully",
        });
      } else {
        return next(new ErrorHandler("Error updating product", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});
