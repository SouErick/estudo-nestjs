import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  email = '';
  password = '';
  error = '';

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {},
      error: () => { this.error = 'Credenciais inválidas'; },
    });
  }
}