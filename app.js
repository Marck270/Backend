// app.js - VERSIÓN PARA RENDER SIN DOTENV
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import usuarioRouter from "./routes/usuarioRouter.js";
import sequelize from "./config/sequelize.js";

const app = express();

// Configurar CORS específicamente para Render
// Reemplaza 'https://tu-frontend.onrender.com' con la URL real de tu frontend en Render
const corsOptions = {
  origin: ['https://frontend-pjs6.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Disposition']
};

app.use(cors(corsOptions));

// Middleware para parsear JSON y URL-encoded
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== RUTAS DE DIAGNÓSTICO ====================

// Ruta de salud básica (sin BD)
app.get("/health", (req, res) => {
  res.json({ 
    status: "Server is running",
    timestamp: new Date().toISOString(),
    environment: "production",
    service: "Backend Lonja Veracruzana"
  });
});

// Ruta de salud con verificación de BD
app.get("/health/db", async (req, res) => {
  try {
    await sequelize.authenticate();
    
    // Obtener información básica de la BD
    const [results] = await sequelize.query('SELECT version() as pg_version');
    
    res.json({ 
      status: "OK",
      database: "Connected",
      pg_version: results[0]?.pg_version,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Error de conexión a la BD:", error.message);
    res.status(500).json({ 
      status: "ERROR",
      database: "Disconnected",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Ruta para verificar que la API responde
app.get("/api/status", (req, res) => {
  res.json({ 
    status: "API is working",
    endpoints: {
      usuario: "/api/usuario",
      lotes: "/api/lote",
      especies: "/api/especie",
      compras: "/api/compra"
    },
    timestamp: new Date().toISOString()
  });
});

// Ruta para verificar configuración (sin exponer datos sensibles)
app.get("/debug", (req, res) => {
  res.json({
    environment: {
      NODE_ENV: "production",
      PORT: process.env.PORT || "No definido (Render asignará uno)",
      server: "Render"
    },
    system: {
      node: process.version,
      platform: process.platform,
      arch: process.arch
    },
    cors: {
      origin: corsOptions.origin,
      methods: corsOptions.methods
    },
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ==================== RUTAS PÚBLICAS ====================

// Rutas de usuario (públicas para registro y login)
app.use('/api/usuario', usuarioRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ 
    message: "API Lonja Veracruzana funcionando en Render",
    version: "1.0.0",
    endpoints: {
      status: "/health",
      database: "/health/db",
      api_status: "/api/status",
      usuario: "/api/usuario",
      documentation: "Ver documentación técnica para más endpoints"
    },
    deployment: "Render"
  });
});

// ==================== RUTAS DE API ====================

// Rutas principales de la API (protegidas)
app.use('/api', router);

// ==================== MANEJO DE ERRORES ====================

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ 
    error: "Ruta no encontrada",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    suggestion: "Ver / para lista de endpoints disponibles"
  });
});

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error('🔥 Error en producción:', {
    message: err.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  const status = err.status || 500;
  const response = {
    error: err.message || 'Error interno del servidor',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  };
  
  // No incluir stack trace en producción por seguridad
  res.status(status).json(response);
});

// ==================== EXPORT ====================

export default app;