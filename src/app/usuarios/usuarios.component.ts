import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }
}
