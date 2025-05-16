import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  imports: [CommonModule, UsuariosRoutingModule],
  declarations: [UsuariosComponent],
  providers: [],
})
export class UsuariosModule {}
