import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MedicoDetallePage } from '../medico-detalle/medico-detalle';
import { MedicoCrearPage } from '../medico-crear/medico-crear';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-medico',
    templateUrl: 'medico.html',
})
export class MedicoPage {

    loadInit: boolean = true;

    medicoDetalle = MedicoDetallePage;
    medicoCrear = MedicoCrearPage;

    medicos: any = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoPage');
    }

    ionViewWillEnter() {
        this.getAllMedicos();
    }

    async deleteMedico(id_: any) {
        await this.databaseProvider.deleteMedico(id_).then((res) => {
            console.log("deleteMedico:::res:::", res);
        }).catch((err) => {
            console.log("deleteMedico:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

    async getAllMedicos() {
        this.medicos = [];
        this.loadInit = true;
        await this.databaseProvider.getAllMedicos().then((res) => {
            this.loadInit = false;
            console.log("getAllMedicos:::res:::", res);
            if (res.length === 0) {
                this.medicos = [];
            } else {
                this.medicos = res;
                console.log("Listado de medicos:::", this.medicos);
            }
        }).catch((err) => {
            console.log("getAllMedicos:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

}
