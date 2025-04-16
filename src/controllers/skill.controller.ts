import { Request, Response } from "express";
import { SkillService } from "../services/skill.service";
import { SkillDto } from "../dto/skill.dto";

export const getSkills = async (req: Request, res: Response): Promise<void> => {
    try {
        const skills = await new SkillService().getSkills();
        if (!skills) {
            res.status(404).json({ message: "No se encontraron habilidades" });
            return;
        }
        res.status(200).json(skills);
    } catch (error) {
        console.error("Error al obtener habilidades:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getSkillById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const skill = await new SkillService().getSkillById(id);

        if (!skill) {
            res.status(404).json({ message: "Habilidad no encontrada" });
            return;
        }
        res.status(200).json(skill);
    } catch (error) {
        console.error(`Error al obtener habilidad:`, error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const skillData: SkillDto = req.body;

        if (!skillData.image) {
            res.status(400).json({ message: "Se requiere una URL de imagen" });
            return;
        }

        const result = await new SkillService().createSkill(skillData);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error al crear habilidad:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al crear la habilidad",
        });
    }
};

export const createSkills = async (req: Request, res: Response): Promise<void> => {
    try {
        const skillsData: SkillDto[] = req.body;

        if (!skillsData || skillsData.length === 0) {
            res.status(400).json({ message: "Se requieren habilidades para crear" });
            return;
        }

        const result = await new SkillService().createSkills(skillsData);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error al crear habilidades:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al crear las habilidades",
        });
    }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const skillData: Partial<SkillDto> = req.body;

        const result = await new SkillService().updateSkill(id, skillData);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error al actualizar habilidad:`, error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al actualizar la habilidad",
        });
    }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const result = await new SkillService().deleteSkill(id);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error al eliminar habilidad:`, error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error al eliminar la habilidad",
        });
    }
};
