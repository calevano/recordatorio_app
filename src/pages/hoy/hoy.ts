import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Pages
import { HoyMedicamentoPage } from '../hoy-medicamento/hoy-medicamento';
import { HoyDetallePage } from '../hoy-detalle/hoy-detalle';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-hoy',
    templateUrl: 'hoy.html',
})
export class HoyPage {

    hoyMedicamento = HoyMedicamentoPage;
    hoyDetalle = HoyDetallePage;

    recordatorios: any = [];
    loadInit: boolean = true;

    constructor(
        public navCtrl: NavController,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {
    }

    ionViewDidLoad() { }

    ionViewWillEnter() {
        this.getAllRecordatorio();
    }

    async getAllRecordatorio() {
        this.recordatorios = [];
        this.loadInit = true;
        await this.databaseProvider.getAllRecordatorio().then((res) => {
            this.recordatorios = (res.length === 0) ? [] : res;
            this.loadInit = false;
        }).catch((err) => {
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

}
