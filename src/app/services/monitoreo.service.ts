
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Monitoreo } from '../models/monitoreo.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  private apiUrl = 'https://shippoback.azurewebsites.net/api/monitoreo'; //url del dominio del back

  constructor(private http: HttpClient) {
    this.getUserLocation();
   }

  public useLocation?: [number, number]

  //funcion que busca la unicación actual
  public getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.useLocation = [coords.latitude, coords.longitude]
      }
    );

  }
  //Endpoint consultar todas las cordenadas
  getTodosLosPuntos(): Observable<Monitoreo[]> {
    return this.http.get<Monitoreo[]>(`${this.apiUrl}/buscarTodos`).pipe(
      map(response => response as Monitoreo[])
    );
  }

  //Endpoint guradar cordenada
  guardarCord(coordenada: Monitoreo): Observable<Monitoreo> {
    return this.http.post<Monitoreo>(`${this.apiUrl}/guardar`, coordenada);
  }
  //Endpoint update cordenada
  actualizarCord(coordenada: Monitoreo, id: number): Observable<Monitoreo> {
    return this.http.put<Monitoreo>(`${this.apiUrl}/actualizar/${id}`, coordenada);
  }
  //Endpoint eliminar
  eliminarCord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarId/${id}`);
  }
  //End point consultar por id
  getCordenadaPorId(id: number): Observable<Monitoreo> {
    return this.http.get<Monitoreo>(`${this.apiUrl}/buscarporId/${id}`);
  }
}
