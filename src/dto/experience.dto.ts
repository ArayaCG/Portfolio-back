import { Type } from "../enum/type.enum";

interface ExperienceDto {
    name: string;
    description: string;
    technologies: string;
    date: string;
    url_deploy: string;
    image_url?: string;
    logo_url?: string;
    type: Type;
}

export default ExperienceDto;
