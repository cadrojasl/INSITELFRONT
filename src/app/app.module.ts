import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MonitoreoService } from './services/monitoreo.service';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { RouterModule,Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { FormComponent } from './formulario/form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//rutas
const routes: Routes=[
  {path:'',redirectTo: '/monitoreo', pathMatch:'full'},
  {path:'monitoreo', component: MapaComponent},
  {path:'formulario',component:FormularioComponent},
  {path:'formulario/form',component:FormComponent},
  {path:'formulario/form/:id',component:FormComponent}
]
//componentes e importaciones
@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    FooterComponent,
    FormularioComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LeafletModule,
    FormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MonitoreoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
