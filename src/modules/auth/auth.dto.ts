import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}