import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HoyMedicamentoPage } from '../hoy-medicamento/hoy-medicamento';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-hoy',
    templateUrl: 'hoy.html',
})
export class HoyPage {

    hoyMedicamento = HoyMedicamentoPage;

    recordatorios: any = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {

    }

    ionViewDidLoad() {
        this.getAllRecordatorio();
        console.log('ionViewDidLoad HoyPage');
    }

    async getAllRecordatorio() {
        await this.databaseProvider.getAllRecordatorio().then((res) => {
            console.log("getAllRecordatorio:::res:::", res);
            if (res.length === 0) {
                this.recordatorios = [];
            } else {
                this.recordatorios = res;
                console.log("Listado de medicamentos:::", this.recordatorios);
            }
        }).catch((err) => {
            console.log("getAllRecordatorio:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

}
