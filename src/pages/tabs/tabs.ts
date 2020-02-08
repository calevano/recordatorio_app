import { Component } from '@angular/core';

import { HoyPage } from '../hoy/hoy';
import { ProgresoPage } from '../progreso/progreso';
import { InformePage } from '../informe/informe';
import { MedicoPage } from '../medico/medico';
import { MedicinaPage } from '../medicina/medicina';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    hoyRoot = HoyPage;
    medicinaRoot = MedicinaPage;
    progresoRoot = ProgresoPage;
    informeRoot = InformePage;
    medicoRoot = MedicoPage;

    constructor() { }
}
