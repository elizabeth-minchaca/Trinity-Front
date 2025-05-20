import { Component, computed } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  // Signal computado que obtiene el usuario actual desde AuthService
  usuario = computed(() => this.auth.usuarioActual());

  // Inyección del AuthService como público para acceso en plantilla
  constructor(public auth: AuthService) {
    // Si no hay usuario cargado (por ejemplo, acceso directo por URL), intenta cargarlo desde el token
    if (!this.auth.usuarioActual()) {
      this.auth.cargarUsuarioDesdeToken();
    }
  }
}
