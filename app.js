import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import usuarioRouter from "./routes/usuarioRouter.js";

const app = express();

// Configurar CORS específicamente
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas públicas
app.use('/api/usuario/', usuarioRouter);

// Rutas protegidas
app.use('/api', router); // Agregar middleware authRequired aquí

app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

export default app;