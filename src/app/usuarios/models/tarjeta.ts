import { MarcaTarjeta } from "./marca-tarjeta";
import { TipoTarjeta } from "./tipo-tarjeta";

export interface Tarjeta {
  id: number;
  numero: number;
  nombre_titular: string;
  fecha_inicio?: string;
  fecha_vencimiento: string;
  cvv: number;
  usuario_id: number;
  anverso_url?: string;
  reverso_url?: string;
  marca?: MarcaTarjeta;
  tipo?: TipoTarjeta;
}
