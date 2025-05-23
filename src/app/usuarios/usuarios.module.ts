import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzZorroModule } from '../shared/nz-zorro.module';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    NzZorroModule
  ],
  declarations: [
    UsuariosComponent,
    PerfilUsuarioComponent,
    RegistrarUsuarioComponent],
  providers: [],
})
export class UsuariosModule {}
