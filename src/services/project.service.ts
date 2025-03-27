import ProjectDto from "../dto/project.dto";
import { Project } from "../entities/Project";
import { ProjectRepository } from "../repositories/Project.repository";
import { uploadToCloudinary } from "../helpers/uploadImage";
import redis from "../config/redisClient";

export class ProjectService {
    private readonly PROJECTS_CACHE_KEY = "portfolio:projects";
    private readonly PROJECTS_CACHE_EXPIRATION = 3600; // 1 hora

    async getProjects(): Promise<Project[]> {
        try {
            // Primero, intentar obtener proyectos desde caché
            const cachedProjects = await redis.get(this.PROJECTS_CACHE_KEY);

            if (cachedProjects) {
                // Si hay caché, retornar proyectos parseados
                return JSON.parse(cachedProjects);
            }

            // Si no hay caché, obtener proyectos de la base de datos
            const projects = await ProjectRepository.find();

            // Guardar proyectos en caché
            await redis.setex(this.PROJECTS_CACHE_KEY, this.PROJECTS_CACHE_EXPIRATION, JSON.stringify(projects));

            return projects;
        } catch (error) {
            console.error("Error obteniendo proyectos con caché:", error);
            // En caso de error, intentar obtener directamente de la base de datos
            return await ProjectRepository.find();
        }
    }

    async getProjectById(id: number): Promise<Project | null> {
        try {
            const cacheKey = `portfolio:project:${id}`;

            // Buscar proyecto en caché
            const cachedProject = await redis.get(cacheKey);

            if (cachedProject) {
                // Si está en caché, retornar proyecto parseado
                return JSON.parse(cachedProject);
            }

            // Buscar proyecto en base de datos
            const project = await ProjectRepository.findOne({
                where: { id },
            });

            if (project) {
                // Guardar proyecto en caché
                await redis.setex(cacheKey, this.PROJECTS_CACHE_EXPIRATION, JSON.stringify(project));
            }

            return project;
        } catch (error) {
            console.error(`Error obteniendo proyecto ${id} con caché:`, error);
            // En caso de error, buscar directamente en base de datos
            return await ProjectRepository.findOne({ where: { id } });
        }
    }

    async invalidateProjectsCache(): Promise<void> {
        try {
            // Eliminar caché de lista de proyectos
            await redis.del(this.PROJECTS_CACHE_KEY);
            console.log("Caché de proyectos invalidado");
        } catch (error) {
            console.error("Error invalidando caché de proyectos:", error);
        }
    }

    async invalidateProjectCache(id: number): Promise<void> {
        try {
            const cacheKey = `portfolio:project:${id}`;
            await redis.del(cacheKey);
            console.log(`Caché de proyecto ${id} invalidado`);
        } catch (error) {
            console.error(`Error invalidando caché de proyecto ${id}:`, error);
        }
    }

    async createProject(projectData: ProjectDto, imageFile: Express.Multer.File): Promise<Project> {
        try {
            const imageUrl = await uploadToCloudinary(imageFile.path);

            const newProject = ProjectRepository.create({
                ...projectData,
                image_url: imageUrl,
            });

            const savedProject = await ProjectRepository.save(newProject);

            // Invalidar caché de proyectos después de crear
            await this.invalidateProjectsCache();

            return savedProject;
        } catch (error) {
            console.error("Error creating project:", error);
            throw new Error("Unable to create project.");
        }
    }

    async updateProject(
        id: number,
        projectData: Partial<ProjectDto>,
        imageFile?: Express.Multer.File
    ): Promise<Project> {
        try {
            const existingProject = await this.getProjectById(id);

            if (!existingProject) {
                throw new Error("Project not found");
            }

            if (imageFile) {
                const imageUrl = await uploadToCloudinary(imageFile.path);
                projectData.image_url = imageUrl;
            }

            const updatedProject = {
                ...existingProject,
                ...projectData,
            };

            const savedProject = await ProjectRepository.save(updatedProject);

            await this.invalidateProjectsCache();
            await this.invalidateProjectCache(id);

            return savedProject;
        } catch (error) {
            console.error(`Error updating project ${id}:`, error);
            throw new Error("Unable to update project.");
        }
    }

    async deleteProject(id: number): Promise<void> {
        const project = await this.getProjectById(id);

        if (project) {
            await ProjectRepository.remove(project);

            // Invalidar caché después de eliminar
            await this.invalidateProjectsCache();
            await this.invalidateProjectCache(id);
        }
    }
}

// Exportar una instancia singleton
export const projectService = new ProjectService();
