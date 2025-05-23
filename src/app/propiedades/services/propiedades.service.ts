// src/app/services/propiedades.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../models/search';
import { Propiedad } from '../models/propiedad';

@Injectable({
  providedIn: 'root',
})
export class PropiedadesService {
  private apiUrl = 'http://localhost:5000/propiedades';

  constructor(private http: HttpClient) {}

  // Obtener todas las propiedades
  getPropiedades(): Observable<any[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/`);
  }
  getPropiedadesEliminadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eliminadas`);
  }

  // Crear una propiedad
  createPropiedad(propiedad: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, propiedad);
  }

  get_propiedad_id(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/id/${id}`);
  }

  cambiar_estado_propiedad(id: number) {
    return this.http.patch<any[]>(`${this.apiUrl}/cambiarEstado/${id}`, {});
  }

  eliminar_propiedad(id: number) {
    return this.http.patch<any[]>(`${this.apiUrl}/eliminar/${id}`, {});
  }

  search(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      params,
    });
  }
}
