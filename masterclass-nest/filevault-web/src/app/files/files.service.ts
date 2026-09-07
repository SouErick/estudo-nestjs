import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface S3File {
    Key: string,
    Size: number,
    LastModified: string,
}

@Injectable({providedIn: 'root'})
export class FilesService {
    private http = inject(HttpClient);
    private readonly API = 'http://localhost:3000';

    list(){
        return this.http.get<S3File[]>(`${this.API}/files`);
    }

    upload(file: File){
        const form = new FormData();
        form.append('file', file);
        return this.http.post<{key: string; message: string}>(
            `${this.API}/files/upload`,
            form,
        );
    }

    getDownloadUrl(key: string){
        return this.http.get<string>(
            `${this.API}/files/${encodeURIComponent(key)}/download`,
        );
    }

}