import { Request, Response } from "express";
import { experienceService } from "../services/experience.service";

export const getExperiences = async (req: Request, res: Response) => {
    try {
        const experiences = await experienceService.getExperiences();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving experiences",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getExperienceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const experience = await experienceService.getExperienceById(Number(id));

        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const createExperience = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];
        const experienceData = req.body;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        await experienceService.createExperience(experienceData, files);
        res.status(201).json({ message: "Experience created successfully" });
    } catch (error) {
        console.error("Error creating experience:", error);
        res.status(500).json({
            message: "Error creating experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const updateExperience = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const experienceData = req.body;
        const files = req.files as Express.Multer.File[];

        await experienceService.updateExperience(Number(id), experienceData, files);
        res.status(200).json({ message: "Experience updated successfully" });
    } catch (error) {
        console.error("Error updating experience:", error);

        if (error instanceof Error && error.message === "Experience not found") {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.status(500).json({
            message: "Error updating experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await experienceService.deleteExperience(Number(id));
        res.status(200).json({ message: "Experience deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting experience",
            error: error instanceof Error ? error.message : error,
        });
    }
};
