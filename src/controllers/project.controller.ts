import { Request, Response } from "express";
import { createProjectService, getProjectsService, deleteProjectService } from "../services/project.service";
import { Project } from "../entities/Project";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects: Project[] = await getProjectsService();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving projects", error });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const projectData = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newProject = await createProjectService(projectData, file);
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Error creating project", error });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteProjectService(Number(id));
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project", error });
    }
};
