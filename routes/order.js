import { Router } from "express";
import {
  getAllOrders,
  addOrder,
  getOrders,
  getOrder,
  updOrder,
  changeStatus,
} from "../controllers/order.js";
const router = Router();

router.post("/new", addOrder);
router.get("/all", getAllOrders);
router.put("/status/:Id", changeStatus);
router.get("/all/:id_usuario", getOrders);
router.route("/my/:Id").get(getOrder).put(updOrder);

export default router;
