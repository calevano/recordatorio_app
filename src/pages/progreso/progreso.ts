import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-progreso',
    templateUrl: 'progreso.html',
})
export class ProgresoPage {

    progresos: any = [];
    loadInit: boolean = true;

    constructor(
        public navCtrl: NavController,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {
    }

    ionViewDidLoad() {
        console.log('ProgresoPage:::ionViewDidLoad');
    }

    ionViewWillEnter() {
        console.log('ProgresoPage:::ionViewWillEnter');
        this.getAllProgreso();
    }

    async getAllProgreso() {
        this.progresos = [];
        await this.databaseProvider.getAllProgreso().then((res) => {
            console.log("ProgresoPage:::getAllProgreso:::res:::", res);
            if (res.length === 0) {
                this.progresos = [];
            } else {
                this.progresos = res;
                console.log("ProgresoPage:::Listado de progresos:::", this.progresos);
            }
            this.loadInit = false;
        }).catch((err) => {
            console.log("ProgresoPage:::getAllProgreso:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta otra vez", "bottom");
        });
    }

}
