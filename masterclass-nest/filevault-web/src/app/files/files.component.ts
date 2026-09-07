import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FilesService, S3File } from './files.service';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './files.html',
})
export class FilesComponent implements OnInit {
  private filesService = inject(FilesService);
  private authService = inject(AuthService);

  files: S3File[] = [];
  uploading = false;
  message = '';
  error = '';

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.error = '';
    this.filesService.list().subscribe({
      next: (data) => {
        console.log('arquivos recebidos:', data);
        this.files = data;
      },
      error: (err) => {
        console.error('erro ao listar:', err);
        this.error = `Erro ao carregar arquivos: ${err.status}`;
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.uploading = true;
    this.message = '';
    this.error = '';

    this.filesService.upload(file).pipe(
      finalize(() => {
        this.uploading = false;
        input.value = '';
      }),
    ).subscribe({
      next: (res) => {
        console.log('upload ok:', res);
        this.message = res.message;
        this.loadFiles();  // recarrega a lista após upload
      },
      error: (err) => {
        console.error('erro no upload:', err);
        this.error = `Erro no upload: ${err.status}`;
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}