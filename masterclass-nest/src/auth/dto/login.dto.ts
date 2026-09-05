import {IsEmail, IsString, MinLength, IsEmpty} from 'class-validator';

export class LoginDto {
    @IsEmail({}, {message: 'Email inválido'})
    email: string;

    @IsEmpty({message: 'Senha não pode ser vazia'})
    @IsString({message: 'Senha deve ser texto'})
    @MinLength(6, {message: 'Senha deve ter no mínimo 6 caracteres'})
    password: string;
}