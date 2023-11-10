// monitoreo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Monitoreo } from '../models/monitoreo.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  private apiUrl = 'http://localhost:8080/api/monitoreo';

  constructor(private http: HttpClient) {
    this.getUserLocation();
   }

  public useLocation?: [number, number]


  public getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.useLocation = [coords.latitude, coords.longitude]
      }
    );

  }
  getTodosLosPuntos(): Observable<Monitoreo[]> {
    return this.http.get<Monitoreo[]>(`${this.apiUrl}/buscarTodos`).pipe(
      map(response => response as Monitoreo[])
    );
  }

  guardarCord(coordenada: Monitoreo): Observable<Monitoreo> {
    return this.http.post<Monitoreo>(`${this.apiUrl}/guardar`, coordenada);
  }

  actualizarCord(coordenada: Monitoreo, id: number): Observable<Monitoreo> {
    return this.http.put<Monitoreo>(`${this.apiUrl}/actualizar/${id}`, coordenada);
  }
  eliminarCord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarId/${id}`);
  }
  getCordenadaPorId(id: number): Observable<Monitoreo> {
    return this.http.get<Monitoreo>(`${this.apiUrl}/buscarporId/${id}`);
  }
}
