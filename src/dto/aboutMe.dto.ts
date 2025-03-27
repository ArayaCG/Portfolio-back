import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class AboutMeDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    rol: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    image: string;
}
