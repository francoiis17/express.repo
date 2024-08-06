import { Router } from "express";
import { addProduct, getProduct, updProduct } from "../controllers/product.js";
const router = Router();

router.post("/new", addProduct);
router.route("/my/:id_usuario").get(getProduct).put(updProduct);

export default router;
