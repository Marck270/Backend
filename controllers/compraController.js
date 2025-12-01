import { Op } from "sequelize";
import Compra from "../models/Compra.js";

    export const createCmp = async (req, res) =>{
        try {
            const compra = await Compra.create(req.body);
            res.json(compra);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findAllCmp = async(req, res) => {
        try {
            const compras = await Compra.findAll();
            res.json(compras);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findOneCmp = async(req, res) => {
        try {
            const compra = await Compra.findByPk(req.params.id);
            if (!compra) return res.status(404).json({ error: "Compra no encontrada"});
            res.json(compra);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // http://localhost:3000/compra/por-dia/2025-03-01
    export const findByDayCmp = async (req, res) => {
    try {
        const { fecha } = req.params; // yyyy-mm-dd

        const inicioDia = new Date(`${fecha}T00:00:00`);
        const finDia = new Date(`${fecha}T23:59:59`);

        const compras = await Compra.findAll({
            where: {
                fecha_cmp: {
                    [Op.between]: [inicioDia, finDia]
                }
            }
        });

        res.json(compras);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // http://localhost:3000/compra/rango/2025-03-01/2025-03-07
    export const findByRangeCmp = async (req, res) => {
    try {
        const { inicio, fin } = req.params; // yyyy-mm-dd

        const inicioFecha = new Date(`${inicio}T00:00:00`);
        const finFecha = new Date(`${fin}T23:59:59`);

        const compras = await Compra.findAll({
            where: {
                fecha_cmp: {
                    [Op.between]: [inicioFecha, finFecha]
                }
            }
        });

        res.json(compras);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const updateCmp = async(req, res) => {
        try {
            const compra = await Compra.findByPk(req.params.id);
            if (!compra) return res.status(404).json({ error: "Compra no encontrada"});

            await compra.update(req.body);
            res.json(compra);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const deleteCmp = async(req, res) => {
        try {
            const compra = await Compra.findByPk(req.params.id);
            if (!compra) return res.status(404).json({ error: "Compra no encontrada"});

            await compra.destroy();
            res.json({ message: "Compra eliminada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
