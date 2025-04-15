"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getSkills = void 0;
const skill_service_1 = require("../services/skill.service");
const getSkills = async (req, res) => {
    try {
        const skills = await new skill_service_1.SkillService().getSkills();
        if (!skills) {
            res.status(404).json({ message: "No se encontraron habilidades" });
            return;
        }
        res.status(200).json(skills);
    }
    catch (error) {
        console.error("Error al obtener habilidades:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getSkills = getSkills;
const getSkillById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const skill = await new skill_service_1.SkillService().getSkillById(id);
        if (!skill) {
            res.status(404).json({ message: "Habilidad no encontrada" });
            return;
        }
        res.status(200).json(skill);
    }
    catch (error) {
        console.error(`Error al obtener habilidad:`, error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getSkillById = getSkillById;
const createSkill = async (req, res) => {
    try {
        const skillData = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "Se requiere un archivo de imagen" });
            return;
        }
        const result = await new skill_service_1.SkillService().createSkill(skillData, file);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error al crear habilidad:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al crear la habilidad",
        });
    }
};
exports.createSkill = createSkill;
const updateSkill = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const skillData = req.body;
        const file = req.file;
        const result = await new skill_service_1.SkillService().updateSkill(id, skillData, file);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`Error al actualizar habilidad:`, error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al actualizar la habilidad",
        });
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await new skill_service_1.SkillService().deleteSkill(id);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`Error al eliminar habilidad:`, error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al eliminar la habilidad",
        });
    }
};
exports.deleteSkill = deleteSkill;
