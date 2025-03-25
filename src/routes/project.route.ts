import { Router } from "express";
import { createProject, deleteProject, getProjects } from "../controllers/project.controller";
import upload from "../config/multer.config";

const projectRoute: Router = Router();

projectRoute.get("/", getProjects);
projectRoute.post("/", upload.single("image"), createProject);
projectRoute.delete("/:id", deleteProject);

export default projectRoute;
