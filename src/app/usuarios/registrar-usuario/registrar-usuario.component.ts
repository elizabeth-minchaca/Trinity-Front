import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ParametricasService } from '../../shared/services/parametricas.service';
import { Pais } from '../models/pais';
import { Rol } from '../models/rol';
import { TipoIdentificacion } from '../models/tipo-identificacion';
import { MarcaTarjeta } from '../models/marca-tarjeta';
import { TipoTarjeta } from '../models/tipo-tarjeta';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  form!: FormGroup;
  tarjetaHoverIndex: number | null = null;
  paises: Pais[] = [];
  roles: Rol[] = [];
  tiposIdentificacion: TipoIdentificacion[] = [];
  marcasTarjeta: MarcaTarjeta[] = [];
  tiposTarjeta: TipoTarjeta[] = [];

  constructor(private fb: FormBuilder, private parametricasService: ParametricasService) {
  }

  ngOnInit(): void {
    this._loadPaises();
    this._loadRoles();
    this._loadTiposIdentificacion();
    this._loadMarcasTarjeta();
    this._loadTiposTarjeta();
    this._initForm();
  }

  private _initForm() {
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
      tarjetas: this.fb.array([this._createTarjetaFormGroup()])
    });
  }

  private _createTarjetaFormGroup(): FormGroup {
    return this.fb.group({
      marca: [null, Validators.required],
      tipo: [1, Validators.required],
      numero: ['', Validators.required],
      nombre_titular: ['', Validators.required],
      fecha_inicio: [null],
      fecha_vencimiento: [null, Validators.required],
      cvv: ['', Validators.required],
      usuario_id: [null],
      anverso_url: [null],
      reverso_url: [null]
    })
  }

  get tarjetas(): FormArray {
    return this.form.get('tarjetas') as FormArray;
  }

  agregarTarjeta() {
    this.tarjetas.push(this._createTarjetaFormGroup());
  }

  eliminarTarjeta(index: number) {
    // Si solo hay una tarjeta, resetea el form en vez de eliminar para evitar errores de controles
    if (this.tarjetas.length === 1) {
      this.tarjetas.at(0).reset({
        marca: null,
        tipo: 1,
        numero: '',
        nombre_titular: '',
        fecha_inicio: null,
        fecha_vencimiento: null,
        cvv: '',
        usuario_id: null,
        anverso_url: null,
        reverso_url: null
      });
    } else {
      this.tarjetas.removeAt(index);
    }
  }

  private _loadPaises(): void {
    this.parametricasService.get_paises().subscribe(data => this.paises = data);
  }

  private _loadRoles(): void {
    this.parametricasService.get_roles().subscribe(data => this.roles = data);
  }

  private _loadTiposIdentificacion(): void {
    this.parametricasService.get_tipos_identificacion().subscribe(data => this.tiposIdentificacion = data);
  }

  private _loadMarcasTarjeta(): void {
    this.parametricasService.get_marcas_tarjeta().subscribe(data => this.marcasTarjeta = data);
  }

  private _loadTiposTarjeta(): void {
    this.parametricasService.get_tipos_tarjeta().subscribe(data => this.tiposTarjeta = data);
  }

  onFileChange(event: any, i: number, campo: 'anverso_url' | 'reverso_url') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tarjetas.at(i).get(campo)?.setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }



onFechaInicioBlur(event: any, index: number) {
  this.validateFecha(event.target.value, index, 'fecha_inicio');
}

onFechaVencimientoBlur(event: any, index: number) {
  this.validateFecha(event.target.value, index, 'fecha_vencimiento');
}

private validateFecha(value: string, index: number, controlName: string) {
  if (!value) return; // Si está vacío, no validar (a menos que sea requerido)

  const match = value.match(/^(\d{2})\/(\d{4})$/);
  let isValid = false;

  if (match) {
    const mes = parseInt(match[1], 10);
    const anio = parseInt(match[2], 10);

    // Validar mes entre 01-12 y año razonable
    isValid = mes >= 1 && mes <= 12 && anio >= 2020 && anio <= 2040;
  }

  const control = this.tarjetas.at(index).get(controlName);

  if (!isValid) {
    control?.setErrors({ ...control.errors, invalidDate: true });
  } else {
    // Remover solo el error de fecha inválida
    const currentErrors = control?.errors;
    if (currentErrors) {
      delete currentErrors['invalidDate'];
      const hasOtherErrors = Object.keys(currentErrors).length > 0;
      control?.setErrors(hasOtherErrors ? currentErrors : null);
    }
  }
}




  getFormControlValue(control: AbstractControl, campo: string): any {
    return control?.get(campo)?.value;
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.valid) {

      // Formatear fecha_vencimiento de cada tarjeta a mm/yyyy
      /* this.tarjetas.controls.forEach(tarjeta => {
        const raw = tarjeta.get('fecha_vencimiento')?.value;
        if (raw && typeof raw === 'string' && raw.match(/^\d{4}-\d{2}$/)) {
          // raw es "yyyy-mm", convertir a "mm/yyyy"
          const [year, month] = raw.split('-');
          tarjeta.get('fecha_vencimiento')?.setValue(`${month}/${year}`);
        }
      }); */
      const usuario: Usuario = this.form.value;
      // Aquí puedes enviar el usuario al backend
      console.log(usuario);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
