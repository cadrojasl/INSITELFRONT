
import { Component, OnInit } from '@angular/core';
import { icon, Map, marker, tileLayer } from 'leaflet'
import { MonitoreoService } from '../services/monitoreo.service';
import { Monitoreo } from '../models/monitoreo.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  geo: any;
  map: any;
  constructor(private mapService: MonitoreoService) {

  }
  ngOnInit() {
    //inicializa la ubicación actual
    setTimeout(() => {
      console.log(this.mapService.useLocation)
      this.geo = this.mapService.useLocation;
    }, 2000);

  }
  //inicializa el mapa luego de init
  ngAfterViewInit() {

    const myIcon= icon({
      iconUrl: 'assets/marker-icon.png',
      iconSize: [25, 41]
    })

    //mapa importado
    setTimeout(() => {
      this.map = new Map('map').setView(this.geo, 13);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Obtener los puntos y agregar marcadores al mapa
      this.mapService.getTodosLosPuntos().subscribe((puntos: Monitoreo[]) => {
        puntos.forEach(punto => {
          // Determinar el color del marcador según la temperatura
          let color = 'blue'; // Por defecto azul
          if (punto.temperatura > 16) {
            color = 'red'; // Temperatura > 16 °C - Rojo
          } else if (punto.temperatura >= 13) {
            color = 'green'; // Temperatura entre 13°C y 16°C - Verde
          }
          marker(this.geo,{icon:myIcon}).addTo(this.map).bindPopup("<b>Ubicación actual</b>").openPopup();
        
          //iconos
          const customMarker = marker([punto.longitud, punto.latitud], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: `assets/leaf-${color}.png`, 
              shadowUrl: 'assets/leaf-shadow.png',
              shadowSize: [25, 41],
              shadowAnchor:[13, 41]
            }),
            title: punto.nombre
          });

          // Añadir el marcador al mapa
          customMarker.addTo(this.map).bindPopup("<b>Ubicación: </b>"+punto.nombre+"\n<b>Temperatura: </b>"+punto.temperatura+"°").openPopup;
          
        });
      });

}, 2000);
  }
  

}
