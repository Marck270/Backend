// controllers/especieController.js - VERSIÓN ACTUALIZADA
import Especie from "../models/Especie.js";
import cloudinary from '../config/cloudinary.js';

export const createEpe = async (req, res) => {
    try {
        const { nombre, id_lte, id_tpo, descripcion } = req.body;
        const disponibilidad = req.body.disponibilidad !== 'false';
        
        // Si hay imagen subida
        let imagen_url = null;
        let imagen_public_id = null;
        
        if (req.file) {
            imagen_url = req.file.path;
            imagen_public_id = req.file.filename;
        }
        
        const especie = await Especie.create({
            nombre,
            id_lte: parseInt(id_lte),
            id_tpo: parseInt(id_tpo),
            disponibilidad,
            imagen_url,
            imagen_public_id,
            descripcion
        });
        
        res.json({
            message: "Especie creada exitosamente",
            especie
        });
        
    } catch (error) {
        console.error('Error al crear especie:', error);
        res.status(500).json({ error: error.message });
    }
};

export const findAllEpe = async(req, res) => {
    try {
        const especies = await Especie.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json(especies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findOneEpe = async(req, res) => {
    try {
        const especie = await Especie.findByPk(req.params.id);
        if (!especie) return res.status(404).json({ error: "Especie no encontrada"});
        res.json(especie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEpe = async(req, res) => {
    try {
        const especie = await Especie.findByPk(req.params.id);
        if (!especie) return res.status(404).json({ error: "Especie no encontrada"});

        const updateData = { ...req.body };
        
        // Si se sube una nueva imagen
        if (req.file) {
            // Eliminar imagen anterior de Cloudinary si existe
            if (especie.imagen_public_id) {
                await cloudinary.uploader.destroy(especie.imagen_public_id);
            }
            
            updateData.imagen_url = req.file.path;
            updateData.imagen_public_id = req.file.filename;
        }
        
        await especie.update(updateData);
        res.json({ 
            message: "Especie actualizada exitosamente",
            especie 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEpe = async(req, res) => {
    try {
        const especie = await Especie.findByPk(req.params.id);
        if (!especie) return res.status(404).json({ error: "Especie no encontrada"});

        // Eliminar imagen de Cloudinary si existe
        if (especie.imagen_public_id) {
            await cloudinary.uploader.destroy(especie.imagen_public_id);
        }

        await especie.destroy();
        res.json({ message: "Especie eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener especies por lote
export const findByLote = async (req, res) => {
    try {
        const { id_lte } = req.params;
        
        const especies = await Especie.findAll({
            where: { id_lte },
            order: [['nombre', 'ASC']]
        });
        
        res.json(especies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar especies disponibles
export const findAvailable = async (req, res) => {
    try {
        const especies = await Especie.findAll({
            where: { disponibilidad: true },
            order: [['nombre', 'ASC']]
        });
        
        res.json(especies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};