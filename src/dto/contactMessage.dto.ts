import { IsString, IsNotEmpty, IsEmail, MaxLength } from "class-validator";

export class ContactMessageDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
