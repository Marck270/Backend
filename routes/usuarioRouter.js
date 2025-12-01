import express from "express";
import { registrar, listar, usuarioPorId, actualizar, eliminar, confirmar } from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/registrar", registrar);
usuarioRouter.get("/listar", listar);
usuarioRouter.get("/usuarioPorId/:id", usuarioPorId);
usuarioRouter.put("/actualizar/:id", actualizar);
usuarioRouter.get("/confirmar/:token", confirmar);
usuarioRouter.delete("/eliminar/:id", eliminar);

export default usuarioRouter;
