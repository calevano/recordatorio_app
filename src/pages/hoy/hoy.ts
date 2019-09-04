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

    ionViewDidLoad() {
        console.log('HoyPage:::ionViewDidLoad');
    }

    ionViewWillEnter() {
        console.log('HoyPage:::ionViewWillEnter');
        this.getAllRecordatorio();
    }

    async getAllRecordatorio() {
        this.recordatorios = [];
        await this.databaseProvider.getAllRecordatorio().then((res) => {
            console.log("HoyPage:::getAllRecordatorio:::res:::", res);
            if (res.length === 0) {
                this.recordatorios = [];
            } else {
                this.recordatorios = res;
                console.log("HoyPage:::Listado de medicamentos:::", this.recordatorios);
            }
            this.loadInit = false;
        }).catch((err) => {
            console.log("HoyPage:::getAllRecordatorio:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

}
