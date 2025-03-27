import { IsString, IsNotEmpty, MaxLength, IsNumber, IsUrl } from "class-validator";

export class EducationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image_url: string;
}
