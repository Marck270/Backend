import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';

import Lote from "./Lote.js";
import Compra from "./Compra.js";
import Comprador from "./Comprador.js";
import Especie from "./Especie.js";
import Tipo from "./Tipo.js";


Lote.hasOne(Compra, {foreignKey: "id_lte"});
Lote.hasMany(Especie, {foreignKey: "id_lte"});

Compra.belongsTo(Lote, {foreignKey: 'id_lte'});
Compra.belongsTo(Comprador, {foreignKey: 'codigo_cpr'});

Especie.belongsTo(Lote, {foreignKey: 'id_lte'});
Especie.belongsTo(Tipo, {foreignKey: 'id_tpo'});

Comprador.hasMany(Compra, {foreignKey: "codigo_cpr"});

Tipo.hasMany(Especie, {foreignKey: "id_tpo"});

export {
    sequelize,
    Lote,
    Compra,
    Especie,
    Comprador,
    Tipo
}
