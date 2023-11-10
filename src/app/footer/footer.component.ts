import { Component } from "@angular/core";
//component del footer
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']

})
export class FooterComponent {
    autor: any={nombre:'Carlos', apellido: 'Rojas'};
}

