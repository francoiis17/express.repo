import { Router } from "express";
import {
  getUser,
  addUser,
  updUser,
  getUsers,
} from "../controllers/user.js";
const router = Router();

router.post("/new", addUser);

router.get("/all", getUsers);
router.route("/me/:id_usuario").get(getUser).put(updUser);

export default router;
