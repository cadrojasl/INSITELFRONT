import { Component, OnInit } from '@angular/core';
import { Monitoreo } from '../models/monitoreo.model';
import { MonitoreoService } from '../services/monitoreo.service';
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public monitor: Monitoreo = { id: 0, nombre: '', longitud: 0, latitud: 0, temperatura: 0 };


  constructor(private monService: MonitoreoService,
  private router: Router,
private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCordenada()
  }
//funcion para traer la cordenada por id
  cargarCordenada(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.monService.getCordenadaPorId(id).subscribe( (monitor) => this.monitor = monitor)
      }
    })
  }
//funcion para crear la cordenada 
  create(): void {
    if (this.monitor.nombre.trim() === "" || this.monitor.latitud === 0 || this.monitor.longitud === 0 ) {

      swal('Advertencia', `Todos los campos son obligatorios!`, 'warning');
      return;
    }
    this.monService.guardarCord(this.monitor)
      .subscribe(monitor => {
        this.router.navigate(['/formulario'])
        swal('Nueva cordenada', `La cordenada con nombre ${monitor.nombre} creado con éxito!`, 'success')
      }
      );
  }
//funcion para actualizar la cordenada
  update():void{

    if (this.monitor.nombre.trim() === "" || this.monitor.latitud === 0 ||this.monitor.longitud === 0 ) {

      swal('Advertencia', `Los campos  no pueden estar vacios!`, 'warning');
      return;
    }
    this.monService.actualizarCord(this.monitor,this.monitor.id)
    .subscribe( monitor => {
      this.router.navigate(['/formulario'])
      swal('Cordenada Actualizada', `La cordenada con nombre${monitor.nombre} actualizado con éxito!`, 'success')
    }

    )
  }

}
