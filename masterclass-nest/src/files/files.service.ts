import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService{
    list(userId: number): object[]{
        return [
            {id : 1, name: 'documento.pdf', owner: userId},
            {id : 2, name: 'foto.png', owner: userId},
        ];
    }
}