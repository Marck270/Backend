import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Comprador = sequelize.define('Comprador', {
    codigo_cpr: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
    },

    nombre:{
        type: DataTypes.STRING(15),
        allowNull: false
    },

    apellido_paterno:{
        type: DataTypes.STRING(15),
        allowNull: false
    },

    apellido_materno:{
        type: DataTypes.STRING(15),
        allowNull: false
    },

    direccion:{
        type: DataTypes.STRING(200),
        allowNull: false
    },

    correo:{
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    }

}, {
    tableName: 'Comprador',  // nombre real de la tabla
    timestamps: false        // si no tienes createdAt/updatedAt
});

export default Comprador;
