import { Rol } from './rol';
import { TipoIdentificacion } from './tipo-identificacion';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  roles: Rol[];
  tipo_identificacion?: TipoIdentificacion;
  numero_identificacion?: string;
}
