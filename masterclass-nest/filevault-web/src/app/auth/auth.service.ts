import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API = 'http://localhost:3000';
  private readonly TOKEN_KEY = 'access_token';

  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${this.API}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.TOKEN_KEY, res.access_token);
          this.router.navigate(['/files']);
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}