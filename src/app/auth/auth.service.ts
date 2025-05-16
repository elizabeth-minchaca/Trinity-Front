import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioLogueado {
  id: string;
  correo: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  usuarioActual = signal<UsuarioLogueado | null>(null);

  constructor(private http: HttpClient) {
    this.cargarUsuarioDesdeToken();
  }

  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
          this.setUsuarioDesdeToken(response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.usuarioActual.set(null);
    // Opcional: llamar a /auth/logout en backend si quieres invalidar el token
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setUsuarioDesdeToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.usuarioActual.set({
        id: payload.sub || payload.identity || '',
        correo: payload.correo,
        rol: payload.rol
      });
    } catch {
      this.usuarioActual.set(null);
    }
  }

  private cargarUsuarioDesdeToken() {
    const token = this.getToken();
    if (token) {
      this.setUsuarioDesdeToken(token);
    }
  }
}
