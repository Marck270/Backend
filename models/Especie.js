import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Especie = sequelize.define('Especie', {
    id_epe: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre:{
        type: DataTypes.STRING(25),
        allowNull: false
    },

    id_lte:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },

    id_tpo:{
        type:DataTypes.SMALLINT,
        allowNull: false,
    },

    disponibilidad:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    },

    imagen:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
}, {
    tableName: 'Especie',  // nombre real de la tabla
    timestamps: false        // si no tienes createdAt/updatedAt
});

export default Especie;
