import { Op } from "sequelize";
import Lote from "../models/Lote.js";

    export const createLte = async(req, res) => {
        try {
            const lote = await Lote.create(req.body);
            res.json(lote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findAllLte = async(req, res) => {
        try {
            const lotes = await Lote.findAll();
            res.json(lotes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findOneLte = async(req, res) => {
        try {
            const lote = await Lote.findByPk(req.params.id);
            if (!lote) return res.status(404).json({ error: "Lote no encontrado"});
            res.json(lote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // http://localhost:3000/lote/por-dia/2025-03-01
    export const findByDayLte = async (req, res) => {
    try {
        const { fecha } = req.params; // yyyy-mm-dd

        const inicioDia = new Date(`${fecha}T00:00:00`);
        const finDia = new Date(`${fecha}T23:59:59`);

        const lotes = await Lote.findAll({
            where: {
                fecha_lte: {
                    [Op.between]: [inicioDia, finDia]
                }
            }
        });

        res.json(lotes);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // http://localhost:3000/lote/rango/2025-03-01/2025-03-07
    export const findByRangeLte = async (req, res) => {
    try {
        const { inicio, fin } = req.params; // yyyy-mm-dd

        const inicioFecha = new Date(`${inicio}T00:00:00`);
        const finFecha = new Date(`${fin}T23:59:59`);

        const lotes = await Lote.findAll({
            where: {
                fecha_lte: {
                    [Op.between]: [inicioFecha, finFecha]
                }
            }
        });

        res.json(lotes);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const updateLte = async(req, res) => {
        try {
            const lote = await Lote.findByPk(req.params.id);
            if (!lote) return res.status(404).json({ error: "Lote no encontrado"});

            await lote.update(req.body);
            res.json(lote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const deleteLte = async(req, res) => {
        try {
            const lote = await Lote.findByPk(req.params.id);
            if (!lote) return res.status(404).json({ error: "Lote no encontrado"});

            await lote.destroy();
            res.json({ message: "Lote eliminada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
