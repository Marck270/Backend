// index.js - VERSIÓN CORREGIDA
import dotenv from "dotenv";
// dotenv.config();
import app from "./app.js";
import sequelize from "./config/sequelize.js";

// Sincronización de modelos
import "./models/Relaciones.js";

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        // 1. Conectar a la base de datos
        await sequelize.authenticate();
        console.log("✅ Conexión a PostgreSQL exitosa");

        // 2. Sincronizar modelos (en producción, usa alter: false)
        await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' }); 
        console.log("✅ Modelos sincronizados");

        // 3. Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
            console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log(`📊 BD URL: ${process.env.DATABASE_URL ? '✅ Configurada' : '❌ No configurada'}`);
        });

    } catch (error) {
        console.error("❌ Error al conectar a PostgreSQL:", error.message);
        console.error("❌ Stack trace:", error.stack);
        process.exit(1); // Salir con error
    }
}

startServer();