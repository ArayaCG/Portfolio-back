import { IsString, IsNotEmpty, MaxLength, IsUrl, IsEnum } from "class-validator";
import { Type } from "../enum/type.enum";

export class ExperienceDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(36)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    technologies: string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    url_deploy: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image_url: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    logo_url: string;

    @IsEnum(Type)
    @IsNotEmpty()
    type: Type;
}
