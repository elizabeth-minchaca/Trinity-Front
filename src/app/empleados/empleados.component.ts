import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/models/usuario';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    // 2 = id de rol EMPLEADO (ajusta si tu enum cambia)
    this.usuariosService.getUsuariosPorRol(2).subscribe((empleados: Usuario[]) => {
      this.empleados = empleados;
    });
  }
}
