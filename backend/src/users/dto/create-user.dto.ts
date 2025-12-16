import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}