import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { soloPublico, soloAdmin } from "./middlewares/authorization.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import product from "./routes/product.js";
import client from "./routes/client.js";
import order from "./routes/order.js";
import admin from "./routes/admin.js";
import user from "./routes/user.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set("port", 4000);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

// Using Middlewares
app.use(express.static(path.join(__dirname, "public")));
const errorPg = path.join(__dirname, "./views/error-404.html");
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
  })
);

// Using Routes
app.use("/api/admin", admin);
app.use("/api/v1/user", user);
app.use("/api/v1/product", product);
app.use("/api/v1/client", client);
app.use("/api/v1/order", order);

//Rutas
app.get("/", soloPublico, (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});
app.get("/login", soloPublico, (req, res) =>
  res.sendFile(__dirname + "/views/login.html")
);
app.get("/register", soloPublico, (req, res) =>
  res.sendFile(__dirname + "/views/register.html")
);
app.get("/admin", soloAdmin, (req, res) =>
  res.sendFile(__dirname + "/views/admin/admin.html")
);
app.get("/orders", soloAdmin, (req, res) =>
  res.sendFile(__dirname + "/views/admin/orders.html")
);
app.get("/users", soloAdmin, (req, res) =>
  res.sendFile(__dirname + "/views/admin/users.html")
);
app.get("/clients", soloAdmin, (req, res) =>
  res.sendFile(__dirname + "/views/admin/clients.html")
);
app.get("*", (req, res) => {
  res.status(404).sendFile(errorPg);
});

// Using Error Middleware
app.use(errorMiddleware);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port: ${app.get("port")}`);
});
