import {createCmp, findAllCmp, findOneCmp, updateCmp, deleteCmp, findByDayCmp, findByRangeCmp} from "../controllers/compraController.js";
import {createLte, findAllLte, findOneLte, updateLte, deleteLte, findByDayLte, findByRangeLte} from "../controllers/loteController.js";
import {createCpr, findAllCpr, findOneCpr, updateCpr, deleteCpr} from "../controllers/compradorController.js";
import {createEpe, findAllEpe, findOneEpe, updateEpe, deleteEpe} from "../controllers/especieController.js";
import {createTpo, findAllTpo, findOneTpo, updateTpo, deleteTpo} from "../controllers/tipoController.js";

import express from "express";
const router = express.Router();

// Compra
router.post('/compra/crear', createCmp);
router.get('/compra/todos', findAllCmp);
router.get('/compra/:id', findOneCmp);
router.put('/compra/actualizar/:id', updateCmp);
router.delete('/compra/borrar/:id', deleteCmp);

router.get('/compra/por-dia/:fecha', findByDayCmp);
router.get('/compra/rango/:inicio/:fin', findByRangeCmp);

// Lote
router.post('/lote/crear', createLte);
router.get('/lote/todos', findAllLte);
router.get('/lote/:id', findOneLte);
router.put('/lote/actualizar/:id', updateLte);
router.delete('/lote/borrar/:id', deleteLte);

router.get('/lote/por-dia/:fecha', findByDayLte);
router.get('/lote/rango/:inicio/:fin', findByRangeLte);

// Comprador
router.post('/comprador/crear', createCpr);
router.get('/comprador/todos', findAllCpr);
router.get('/comprador/:id', findOneCpr);
router.put('/comprador/actualizar/:id', updateCpr);
router.delete('/comprador/borrar/:id', deleteCpr);

// Especie
router.post('/especie/crear', createEpe);
router.get('/especie/todos', findAllEpe);
router.get('/especie/:id', findOneEpe);
router.put('/especie/actualizar/:id', updateEpe);
router.delete('/especie/borrar/:id', deleteEpe);

// Tipo
router.post('/tipo/crear', createTpo);
router.get('/tipo/todos', findAllTpo);
router.get('/tipo/:id', findOneTpo);
router.put('/tipo/actualizar/:id', updateTpo);
router.delete('/tipo/borrar/:id', deleteTpo);

export default router;
