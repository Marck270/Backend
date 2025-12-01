import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Lote = sequelize.define('Lote', {
    id_lte: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    kilos: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    numero_cajas: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },

    precio_kilo_salida: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    fecha_lte: {
        type: DataTypes.DATE,
        allowNull: false
    },

}, {
    tableName: 'Lote',  // nombre real de la tabla
    timestamps: false       // si no tienes createdAt/updatedAt
});

export default Lote;
