import {Injectable} from '@nestjs/common';

// propaga o servico para outros modulos garantido a injeção de dependencia inversa
@Injectable() 
export class AuthService {
    private readonly users = [
        {id: 1, email: 'erick@gmail.com', password: '123456'},
    ];
    
    login(email: string, password: string): string {
        const user = this.users.find(
            (u) => u.email === email && u.password === password,
        );
        if(!user){
            return 'credenciais inválidas';
        }
        return `Bem-vindo, ${user.email}`;
        
    }

}