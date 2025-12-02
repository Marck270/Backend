// routes/router.js - VERSIÓN ACTUALIZADA
import { 
    createCmp, findAllCmp, findOneCmp, updateCmp, deleteCmp, 
    findByDayCmp, findByRangeCmp 
} from "../controllers/compraController.js";

import { 
    createLte, findAllLte, findOneLte, updateLte, deleteLte, 
    findByDayLte, findByRangeLte 
} from "../controllers/loteController.js";

import { 
    createCpr, findAllCpr, findOneCpr, updateCpr, deleteCpr 
} from "../controllers/compradorController.js";

import { 
    createEpe, findAllEpe, findOneEpe, updateEpe, deleteEpe,
    findByLote, findAvailable 
} from "../controllers/especieController.js";

import { 
    createTpo, findAllTpo, findOneTpo, updateTpo, deleteTpo 
} from "../controllers/tipoController.js";

import { uploadImage, deleteImage } from "../controllers/uploadController.js";
import upload from "../middlewares/upload.js";
import { authRequired, adminRequired } from "../middlewares/auth.js";

import express from "express";
const router = express.Router();

// RUTAS PÚBLICAS (No requieren autenticación)
router.post('/upload', upload.single('imagen'), uploadImage);
router.delete('/upload/:public_id', deleteImage);

// Compra (protegidas)
router.post('/compra/crear', authRequired, createCmp);
router.get('/compra/todos', authRequired, findAllCmp);
router.get('/compra/:id', authRequired, findOneCmp);
router.put('/compra/actualizar/:id', authRequired, updateCmp);
router.delete('/compra/borrar/:id', authRequired, adminRequired, deleteCmp);

router.get('/compra/por-dia/:fecha', authRequired, findByDayCmp);
router.get('/compra/rango/:inicio/:fin', authRequired, findByRangeCmp);

// Lote (protegidas)
router.post('/lote/crear', authRequired, adminRequired, createLte);
router.get('/lote/todos', findAllLte); // Pública para ver lotes
router.get('/lote/:id', findOneLte); // Pública
router.put('/lote/actualizar/:id', authRequired, adminRequired, updateLte);
router.delete('/lote/borrar/:id', authRequired, adminRequired, deleteLte);

router.get('/lote/por-dia/:fecha', findByDayLte);
router.get('/lote/rango/:inicio/:fin', findByRangeLte);

// Comprador (protegidas)
router.post('/comprador/crear', createCpr); // Pública para registro
router.get('/comprador/todos', authRequired, adminRequired, findAllCpr);
router.get('/comprador/:id', authRequired, findOneCpr);
router.put('/comprador/actualizar/:id', authRequired, updateCpr);
router.delete('/comprador/borrar/:id', authRequired, adminRequired, deleteCpr);

// Especie (con imágenes)
router.post('/especie/crear', authRequired, adminRequired, upload.single('imagen'), createEpe);
router.get('/especie/todos', findAllEpe); // Pública
router.get('/especie/:id', findOneEpe); // Pública
router.put('/especie/actualizar/:id', authRequired, adminRequired, upload.single('imagen'), updateEpe);
router.delete('/especie/borrar/:id', authRequired, adminRequired, deleteEpe);

// Nuevas rutas para especies
router.get('/especie/lote/:id_lte', findByLote);
router.get('/especie/disponibles', findAvailable);

// Tipo
router.post('/tipo/crear', authRequired, adminRequired, createTpo);
router.get('/tipo/todos', findAllTpo); // Pública
router.get('/tipo/:id', findOneTpo); // Pública
router.put('/tipo/actualizar/:id', authRequired, adminRequired, updateTpo);
router.delete('/tipo/borrar/:id', authRequired, adminRequired, deleteTpo);

export default router;