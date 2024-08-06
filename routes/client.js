import { Router } from "express";
import {
  addClient,
  getClients,
  getClient,
  updClient,
} from "../controllers/client.js";
const router = Router();

router.post("/new", addClient);
router.get("/all", getClients);
router.route("/single/:Id").get(getClient).put(updClient);

export default router;
