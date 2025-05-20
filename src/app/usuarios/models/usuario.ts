import { Pais } from './pais';
import { Rol } from './rol';
import { Tarjeta } from './tarjeta';
import { TipoIdentificacion } from './tipo-identificacion';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  password_hash?: string;
  tipo_identificacion?: TipoIdentificacion;
  numero_identificacion?: string;
  apellido?: string;
  fecha_nacimiento?: string | Date;
  pais?: Pais;
  roles: Rol[];
  tarjetas?: Tarjeta[];
}
