import { Request, Response } from "express";
import { EducationService } from "../services/education.service";
import { EducationDto } from "../dto/education.dto";

const educationService = new EducationService();

export const getAllEducations = async (req: Request, res: Response): Promise<void> => {
    try {
        const educations = await educationService.getEducations();

        if (!educations) {
            res.status(404).json({ message: "No se encontraron registros de educación" });
            return;
        }

        res.status(200).json(educations);
    } catch (error) {
        console.error("Error al obtener educaciones:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener educaciones",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const getEducationById = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
        console.error(`Error al obtener educación por ID:`, error);
        res.status(500).json({
            message: "Error interno del servidor al obtener educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const createEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "Archivo de imagen requerido" });
            return;
        }

        const educationData: EducationDto = req.body;
        const result = await educationService.createEducation(educationData, req.file);

        res.status(201).json(result);
    } catch (error) {
        console.error("Error al crear educación:", error);
        res.status(500).json({
            message: "Error interno del servidor al crear educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const updateEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }

        const educationData: Partial<EducationDto> = req.body;
        const result = await educationService.updateEducation(id, educationData, req.file);

        res.status(200).json(result);
    } catch (error) {
        console.error(`Error al actualizar educación:`, error);
        res.status(500).json({
            message: "Error interno del servidor al actualizar educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const deleteEducation = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }

        const result = await educationService.deleteEducation(id);

        res.status(200).json(result);
    } catch (error) {
        console.error(`Error al eliminar educación:`, error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
