import Comprador from "../models/Comprador.js";

    export const createCpr = async(req, res) => {
        try {
            const comprador = await Comprador.create(req.body);
            res.json(comprador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findAllCpr = async(req, res) => {
        try {
            const compradores = await Comprador.findAll();
            res.json(compradores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findOneCpr = async (req, res) => {
        try {
            const comprador = await Comprador.findByPk(req.params.id);
            if (!comprador) return res.status(404).json({ error: "Comprador no encontrado"});
            res.json(comprador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const updateCpr = async(req, res) => {
        try {
            const comprador = await Comprador.findByPk(req.params.id);
            if (!comprador) return res.status(404).json({ error: "Comprador no encontrado"});

            await comprador.update(req.body);
            res.json(comprador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const deleteCpr = async(req, res) => {
        try {
            const comprador = await Comprador.findByPk(req.params.id);
            if (!comprador) return res.status(404).json({ error: "Comprador no encontrado"});

            await comprador.destroy();
            res.json({ message: "Comprador eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
