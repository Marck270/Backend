import Tipo from "../models/Tipo.js";

    export const createTpo = async(req, res) => {
        try {
            const tipo = await Tipo.create(req.body);
            res.json(tipo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findAllTpo = async(req, res) => {
        try {
            const tipos = await Tipo.findAll();
            res.json(tipos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findOneTpo = async(req, res) => {
        try {
            const tipo = await Tipo.findByPk(req.params.id);
            if (!tipo) return res.status(404).json({ error: "Tipo no encontrado"});
            res.json(tipo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const updateTpo = async(req, res) => {
        try {
            const tipo = await Tipo.findByPk(req.params.id);
            if (!tipo) return res.status(404).json({ error: "Tipo no encontrado"});

            await tipo.update(req.body);
            res.json(tipo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const deleteTpo = async(req, res) => {
        try {
            const tipo = await Tipo.findByPk(req.params.id);
            if (!tipo) return res.status(404).json({ error: "Tipo no encontrado"});

            await tipo.destroy();
            res.json({ message: "Tipo eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
