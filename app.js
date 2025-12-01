import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import usuarioRouter from "./routes/usuarioRouter.js";

const app = express();

// Formatos compatibles
app.use(cors());
app.use(express.json()); // Para recibir JSON

// rutas
app.use('/', router); // Ejemplo de ruta
app.use('/api/usuario/', usuarioRouter); // Para crear usuario

// Ruta inicial para pruebas
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

export default app;
