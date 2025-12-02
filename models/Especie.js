// models/Especie.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Especie = sequelize.define('Especie', {
    id_epe: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },

    id_lte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    id_tpo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },

    disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    // Ahora guardamos la URL de Cloudinary y el public_id
    imagen_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },

    imagen_public_id: {
        type: DataTypes.STRING(100),
        allowNull: true
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    tableName: 'Especie',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

export default Especie;