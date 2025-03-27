import { Request, Response } from "express";
import { AboutMeService } from "../services/aboutMe.service";
import { AboutMeDto } from "../dto/aboutMe.dto";

const aboutMeService = new AboutMeService();

export const getAboutMe = async (req: Request, res: Response): Promise<Response> => {
    try {
        const aboutMe = await aboutMeService.getAboutMe();

        if (!aboutMe) {
            return res.status(404).json({ message: "About Me no encontrado" });
        }

        return res.status(200).json(aboutMe);
    } catch (error) {
        console.error("Error en getAboutMe:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createAboutMe = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Se requiere una imagen" });
        }

        const aboutMeData: AboutMeDto = req.body;
        const result = await aboutMeService.createAboutMe(aboutMeData, req.file);

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error en createAboutMe:", error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error al crear About Me",
        });
    }
};

export const updateAboutMe = async (req: Request, res: Response): Promise<Response> => {
    try {
        const aboutMeData: Partial<AboutMeDto> = req.body;
        const result = await aboutMeService.updateAboutMe(aboutMeData, req.file);

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en updateAboutMe:", error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error al actualizar About Me",
        });
    }
};

export const deleteAboutMe = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await aboutMeService.deleteAboutMe();

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en deleteAboutMe:", error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error al eliminar About Me",
        });
    }
};
