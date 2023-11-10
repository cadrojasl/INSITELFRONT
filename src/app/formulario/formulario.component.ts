import { Component, OnInit } from '@angular/core';
import { Monitoreo } from '../models/monitoreo.model';
import { MonitoreoService } from '../services/monitoreo.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'

})
export class FormularioComponent implements OnInit {
  p: number = 1; // Página inicial

  monitoreos: Monitoreo[] = []; 

  constructor(private monService: MonitoreoService) { }

  ngOnInit() {
    this.monService.getTodosLosPuntos().subscribe(
      monitoreos => this.monitoreos = monitoreos
    );
  }

  delete(cordenada: Monitoreo): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la cordenada ${cordenada.nombre} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.monService.eliminarCord(cordenada.id).subscribe(
          response => {
            this.monitoreos = this.monitoreos.filter(cli => cli !== cordenada)
            swal(
              'Cordenada Eliminada!',
              `Cliente ${cordenada.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
