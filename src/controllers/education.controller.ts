import { Request, Response } from "express";
import { EducationService } from "../services/education.service";
import { EducationDto } from "../dto/education.dto";

const educationService = new EducationService();

export const getAllEducations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const educations = await educationService.getEducations();

        if (!educations) {
            return res.status(404).json({ message: "No se encontraron registros de educación" });
        }

        return res.status(200).json(educations);
    } catch (error) {
        console.error("Error al obtener educaciones:", error);
        return res.status(500).json({
            message: "Error interno del servidor al obtener educaciones",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const getEducationById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const education = await educationService.getEducationById(id);

        if (!education) {
            return res.status(404).json({ message: "Educación no encontrada" });
        }

        return res.status(200).json(education);
    } catch (error) {
        console.error(`Error al obtener educación por ID:`, error);
        return res.status(500).json({
            message: "Error interno del servidor al obtener educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const createEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Archivo de imagen requerido" });
        }

        const educationData: EducationDto = req.body;
        const result = await educationService.createEducation(educationData, req.file);

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error al crear educación:", error);
        return res.status(500).json({
            message: "Error interno del servidor al crear educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const updateEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const educationData: Partial<EducationDto> = req.body;
        const result = await educationService.updateEducation(id, educationData, req.file);

        return res.status(200).json(result);
    } catch (error) {
        console.error(`Error al actualizar educación:`, error);
        return res.status(500).json({
            message: "Error interno del servidor al actualizar educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const deleteEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const result = await educationService.deleteEducation(id);

        return res.status(200).json(result);
    } catch (error) {
        console.error(`Error al eliminar educación:`, error);
        return res.status(500).json({
            message: "Error interno del servidor al eliminar educación",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
