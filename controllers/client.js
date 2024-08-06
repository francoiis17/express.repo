import { getConnection } from "../config/database.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/error.js";

export const addClient = asyncError(async (req, res, next) => {
  const { nombre } = req.body;
  const connection = await getConnection();
  const values = { nombre };

  await connection
    .query("INSERT INTO clientes SET ?", values)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "Client registered successfully",
        });
      } else {
        return next(new ErrorHandler("Error registering client", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const getClients = asyncError(async (req, res, next) => {
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM clientes")
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          clients: rows,
        });
      } else {
        return next(new ErrorHandler("Clients do not exist", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const getClient = asyncError(async (req, res, next) => {
  const { Id } = req.params;
  const connection = await getConnection();

  await connection
    .query("SELECT * FROM clientes WHERE Id = ?", Id)
    .then(([rows]) => {
      if (rows.length !== 0) {
        return res.status(200).json({
          success: true,
          client: rows,
        });
      } else {
        return next(new ErrorHandler("Client not exist", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});

export const updClient = asyncError(async (req, res, next) => {
  const { Id } = req.params;
  const { nombre } = req.body;
  const connection = await getConnection();
  const values = { nombre };

  await connection
    .query("UPDATE clientes SET ? WHERE Id = ?", [values, Id])
    .then((result) => {
      if (result[0].affectedRows === 1) {
        return res.status(200).json({
          success: true,
          message: "Client updated successfully",
        });
      } else {
        return next(new ErrorHandler("Error updating client", 400));
      }
    })
    .catch((error) => {
      return next(new ErrorHandler(error.message, 500));
    });
});
