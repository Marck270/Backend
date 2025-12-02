// routes/usuarioRouter.js - VERSIÓN CORRECTA
import express from "express";
import { 
  registrar, 
  login, 
  listar, 
  usuarioPorId, 
  actualizar, 
  eliminar, 
  confirmar  // Asegúrate de que esta importación esté presente
} from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/registrar", registrar);
usuarioRouter.post("/login", login);
usuarioRouter.get("/listar", listar);
usuarioRouter.get("/usuarioPorId/:id", usuarioPorId);
usuarioRouter.put("/actualizar/:id", actualizar);
usuarioRouter.get("/confirmar/:token", confirmar);  // Esta ruta usa la función
usuarioRouter.delete("/eliminar/:id", eliminar);

export default usuarioRouter;