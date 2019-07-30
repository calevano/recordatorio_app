import { Component } from '@angular/core';
import { HoyPage } from '../hoy/hoy';
import { ProgresoPage } from '../progreso/progreso';
import { InformePage } from '../informe/informe';
import { MedicoPage } from '../medico/medico';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    hoyRoot = HoyPage;
    progresoRoot = ProgresoPage;
    informeRoot = InformePage;
    medicoRoot = MedicoPage;

    constructor() {
        console.log("tabsPage");
    }
}
