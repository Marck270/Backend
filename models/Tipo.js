import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Tipo = sequelize.define('Tipo', {
    id_tpo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre:{
        type: DataTypes.STRING(30),
        allowNull: false
    },

}, {
    tableName: 'Tipo',  // nombre real de la tabla
    timestamps: false        // si no tienes createdAt/updatedAt
});

export default Tipo;