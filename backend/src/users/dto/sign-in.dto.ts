import { IsString, MinLength, IsOptional } from 'class-validator';
export class SignIn {
    @IsString()
    username: string;

    email: string;


    @IsString()
    password: string;
}