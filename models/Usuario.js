import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Usuario = sequelize.define('usuario', {
  id_usr: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING(40),
    allowNull: false
  },

  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  confirmar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  token: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  tipo: {
    type: DataTypes.ENUM("admin", "comprador"),
    allowNull: false,
    defaultValue: "comprador"
  }

}, {
  tableName: 'Usuario',
  timestamps: false,
  scopes: {
    eliminarClave: {
      attributes: {
        exclude: ['token', 'confirmar', 'id_usr', 'password']
      }
    }
  }
});

export default Usuario;
