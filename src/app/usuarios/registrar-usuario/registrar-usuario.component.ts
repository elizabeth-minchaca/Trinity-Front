import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  form: FormGroup;
  tarjetaHoverIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password_hash: ['', [Validators.required, Validators.minLength(6)]],
      tipo_identificacion: [null, Validators.required],
      numero_identificacion: ['', Validators.required],
      fecha_nacimiento: [null, Validators.required],
      pais: [null, Validators.required],
      roles: [[], Validators.required],
      tarjetas: this.fb.array([])
    });
    // Agregar una tarjeta por defecto para evitar error de controles vacíos
    if (this.tarjetas.length === 0) {
      this.agregarTarjeta();
    }
  }

  get tarjetas(): FormArray {
    return this.form.get('tarjetas') as FormArray;
  }

  agregarTarjeta() {
    this.tarjetas.push(this.fb.group({
      marca: [null, Validators.required],
      tipo: [null, Validators.required],
      numero: ['', Validators.required],
      fecha_vencimiento: [null, Validators.required]
    }));
  }

  eliminarTarjeta(index: number) {
    this.tarjetas.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;
      // Aquí puedes enviar el usuario al backend
      console.log(usuario);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
