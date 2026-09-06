import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

// propaga o servico para outros modulos garantido a injeção de dependencia inversa
@Injectable() 
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    private readonly users = [
        {id: 1, email: 'erick@gmail.com', password: '123456'},
    ];
    
    login(email: string, password: string): {access_token: string} {
        const user = this.users.find(
            (u) => u.email === email && u.password === password,
        );
        if(!user){
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const payload = {sub: user.id, email: user.email};

        return {
            access_token: this.jwtService.sign(payload),
        };
        
    }

}