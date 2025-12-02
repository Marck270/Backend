import dotenv from "dotenv";
// dotenv.config();
import Sequelize from "sequelize";

const sequelize = new Sequelize("postgresql://dblonja_user:fzOzV6ECRBWpr4MWpVSX4zpE4ncI2h7n@dpg-d4mlia8gjchc73bcohe0-a.oregon-postgres.render.com/dblonja",
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, // ¡IMPORTANTE para Render!
                rejectUnauthorized: false // Necesario para SSL de Render
            }
        },
        logging: false,
    }
);

export default sequelize;
