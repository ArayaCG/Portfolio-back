import { IsString, IsNotEmpty, MaxLength, IsNumber, IsUrl } from "class-validator";

export class EducationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    year: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image_url: string;
}
