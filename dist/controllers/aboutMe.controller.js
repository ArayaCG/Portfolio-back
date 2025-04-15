"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAboutMe = exports.updateAboutMe = exports.createAboutMe = exports.getAboutMe = void 0;
const aboutMe_service_1 = require("../services/aboutMe.service");
const aboutMeService = new aboutMe_service_1.AboutMeService();
const getAboutMe = async (req, res) => {
    try {
        const aboutMe = await aboutMeService.getAboutMe();
        if (!aboutMe) {
            res.status(404).json({ message: "About Me no encontrado" });
            return; // Asegúrate de retornar después de enviar la respuesta
        }
        res.status(200).json(aboutMe);
    }
    catch (error) {
        console.error("Error en getAboutMe:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getAboutMe = getAboutMe;
const createAboutMe = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "Se requiere una imagen" });
            return;
        }
        const aboutMeData = req.body;
        const result = await aboutMeService.createAboutMe(aboutMeData, req.file);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error en createAboutMe:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al crear About Me",
        });
    }
};
exports.createAboutMe = createAboutMe;
const updateAboutMe = async (req, res) => {
    try {
        const aboutMeData = req.body;
        const result = await aboutMeService.updateAboutMe(aboutMeData, req.file);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error en updateAboutMe:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al actualizar About Me",
        });
    }
};
exports.updateAboutMe = updateAboutMe;
const deleteAboutMe = async (req, res) => {
    try {
        const result = await aboutMeService.deleteAboutMe();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error en deleteAboutMe:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al eliminar About Me",
        });
    }
};
exports.deleteAboutMe = deleteAboutMe;
