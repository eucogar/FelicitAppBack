import { Router } from "express";
import { createNewUser, getUser, getUserLogin, Imagenes, getimagenes} from "../controllers/users.controller";

const router = Router();

router.put("/users/imagenes", Imagenes);
router.post("/imagenes", getimagenes);
router.post("/users", createNewUser);
router.post("/users/login", getUserLogin);
router.post("/getuser", getUser);

export default router;
