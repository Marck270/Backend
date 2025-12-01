import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import sequelize from "./config/sequelize.js";

// Sincronización de modelos
import Lote from "./models/Lote.js";
import Compra from "./models/Compra.js";
import Comprador from "./models/Comprador.js";
import Especie from "./models/Especie.js";
import Tipo from "./models/Tipo.js";
import Usuario from "./models/Usuario.js";
// Declaración de cardinalidades
import "./models/Relaciones.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a PostgreSQL exitosa");

        // Crea las tablas si no existen
        await sequelize.sync({ alter: true }); 
        console.log("Modelos sincronizados");

        app.listen(PORT, () => {
            console.log("Servidor corriendo en el puerto", PORT);
        });

    } catch (error) {
        console.error("Error al conectar a PostgreSQL:", error);
    }
}

startServer();
