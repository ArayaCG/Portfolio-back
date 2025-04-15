"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducationById = exports.getAllEducations = void 0;
const education_service_1 = require("../services/education.service");
const educationService = new education_service_1.EducationService();
const getAllEducations = async (req, res) => {
    try {
        const educations = await educationService.getEducations();
        if (!educations) {
            res.status(404).json({ message: "No se encontraron registros de educación" });
            return;
        }
        res.status(200).json(educations);
    }
    catch (error) {
        console.error("Error al obtener educaciones:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener educaciones",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.getAllEducations = getAllEducations;
const getEducationById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const education = await educationService.getEducationById(id);
        if (!education) {
            res.status(404).json({ message: "Educación no encontrada" });
            return;
        }
        res.status(200).json(education);
    }
    catch (error) {
        console.error(`Error al obtener educación por ID:`, error);
        res.status(500).json({
            message: "Error interno del servidor al obtener educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.getEducationById = getEducationById;
const createEducation = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "Archivo de imagen requerido" });
            return;
        }
        const educationData = req.body;
        const result = await educationService.createEducation(educationData, req.file);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error al crear educación:", error);
        res.status(500).json({
            message: "Error interno del servidor al crear educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.createEducation = createEducation;
const updateEducation = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const educationData = req.body;
        const result = await educationService.updateEducation(id, educationData, req.file);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`Error al actualizar educación:`, error);
        res.status(500).json({
            message: "Error interno del servidor al actualizar educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.updateEducation = updateEducation;
const deleteEducation = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const result = await educationService.deleteEducation(id);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(`Error al eliminar educación:`, error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.deleteEducation = deleteEducation;
