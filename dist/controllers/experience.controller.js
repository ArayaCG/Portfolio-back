"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getExperiences = void 0;
const experience_service_1 = require("../services/experience.service");
const getExperiences = async (req, res) => {
    try {
        const experiences = await experience_service_1.experienceService.getExperiences();
        res.status(200).json(experiences);
    }
    catch (error) {
        console.error("Error retrieving experiences:", error);
        res.status(500).json({
            message: "Error retrieving experiences",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getExperiences = getExperiences;
const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await experience_service_1.experienceService.getExperienceById(Number(id));
        if (!experience) {
            res.status(404).json({ message: "Experience not found" });
            return;
        }
        res.status(200).json(experience);
    }
    catch (error) {
        console.error("Error retrieving experience:", error);
        res.status(500).json({
            message: "Error retrieving experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getExperienceById = getExperienceById;
const createExperience = async (req, res) => {
    try {
        const files = req.files;
        const experienceData = req.body;
        if (!files || files.length === 0) {
            res.status(400).json({ message: "No files uploaded" });
            return;
        }
        await experience_service_1.experienceService.createExperience(experienceData, files);
        res.status(201).json({ message: "Experience created successfully" });
    }
    catch (error) {
        console.error("Error creating experience:", error);
        res.status(500).json({
            message: "Error creating experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.createExperience = createExperience;
const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const experienceData = req.body;
        const files = req.files;
        await experience_service_1.experienceService.updateExperience(Number(id), experienceData, files);
        res.status(200).json({ message: "Experience updated successfully" });
    }
    catch (error) {
        console.error("Error updating experience:", error);
        if (error instanceof Error && error.message === "Experience not found") {
            res.status(404).json({ message: "Experience not found" });
            return;
        }
        res.status(500).json({
            message: "Error updating experience",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        await experience_service_1.experienceService.deleteExperience(Number(id));
        res.status(200).json({ message: "Experience deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.deleteExperience = deleteExperience;
