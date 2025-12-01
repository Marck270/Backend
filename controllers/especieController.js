import Especie from "../models/Especie.js";

    export const createEpe = async(req, res) => {
        try {
            const especie = await Especie.create(req.body);
            res.json(especie);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const findAllEpe = async(req, res) => {
        try {
            const especies = await Especie.findAll();
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

            await especie.update(req.body);
            res.json(especie);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const deleteEpe = async(req, res) =>{
        try {
            const especie = await Especie.findByPk(req.params.id);
            if (!especie) return res.status(404).json({ error: "Especie no encontrada"});

            await especie.destroy();
            res.json({ message: "Especie eliminada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
