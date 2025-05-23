import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallePropiedadComponent } from './detalle-propiedad.component';

const routes : Routes= [
  { 
    path: ':id', 
    component: DetallePropiedadComponent
  }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetallePropiedadRoutingModule {}