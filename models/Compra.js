import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Compra = sequelize.define('Compra', {
    id_cmp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    id_lte: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    codigo_cpr: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },

    precio_kilo_final: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    precio_total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    fecha_cmp: {
        type: DataTypes.DATE,
        allowNull: false
    },

}, {
    tableName: 'Compra',  // nombre real de la tabla
    timestamps: false       // si no tienes createdAt/updatedAt
});

export default Compra;
