import { Router } from "express";
import { Login, Registro, obtenerTodosLosUsuarios} from "../controllers/usuarios.controller";


const router = Router();

router.post("/api/login", Login);
router.post("/api/registro", Registro);
router.get("/api/usuarios", obtenerTodosLosUsuarios);

export default router;
