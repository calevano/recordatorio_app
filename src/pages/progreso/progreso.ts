import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Pages
import { ProgresoDetallePage } from '../progreso-detalle/progreso-detalle';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-progreso',
    templateUrl: 'progreso.html',
})
export class ProgresoPage {

    progresoDetalle = ProgresoDetallePage;
    progresos: any = [];
    loadInit: boolean = true;

    constructor(
        public navCtrl: NavController,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {
    }

    ionViewDidLoad() { }

    ionViewWillEnter() {
        this.getAllProgreso();
    }

    async getAllProgreso() {
        this.progresos = [];
        this.loadInit = true;
        await this.databaseProvider.getAllProgreso().then((res) => {
            this.progresos = (res.length === 0) ? [] : res;
            this.loadInit = false;
        }).catch((err) => {
            this.toastProvider.show("error", "Porfavor intenta otra vez", "bottom");
        });
    }

}
