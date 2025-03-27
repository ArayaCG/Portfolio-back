import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class SkillDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    image: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
