import { Request, Response } from "express";
import { projectService } from "../services/project.service";
import { Project } from "../entities/Project";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects: Project[] = await projectService.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving projects",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProjectById(Number(id));

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving project",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const projectData = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newProject = await projectService.createProject(projectData, file);
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({
            message: "Error creating project",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const projectData = req.body;
        const file = req.file;

        const updatedProject = await projectService.updateProject(Number(id), projectData, file);

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);

        if (error instanceof Error && error.message === "Project not found") {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(500).json({
            message: "Error updating project",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await projectService.deleteProject(Number(id));
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting project",
            error: error instanceof Error ? error.message : error,
        });
    }
};
