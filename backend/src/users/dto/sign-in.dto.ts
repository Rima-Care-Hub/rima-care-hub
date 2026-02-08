import { IsString } from 'class-validator';
export class SignIn {
  @IsString()
  username: string;

  email: string;

  @IsString()
  password: string;
}
