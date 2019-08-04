import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';

import * as moment from 'moment';
import "moment/locale/es";
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-medico-cita-crear',
    templateUrl: 'medico-cita-crear.html',
})
export class MedicoCitaCrearPage {

    data: any = {
        fecha: '',
        hora: '',
        pregunta: ''
    };
    date: any;
    hour: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingProvider: LoadingProvider,
        public toastProvider: ToastProvider,
    ) {
        this.date = moment().format('YYYY-MM-DD');
        this.data.fecha = this.date;
        this.data.hora = moment().format('hh:mm');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoCitaCrearPage');
    }

    saveCita() {

        if (this.data.fecha === "" ||
            this.data.hora === "" ||
            this.data.pregunta === "") {
            console.log("vacio");
            this.toastProvider.showToast("dark", "Necesita completar todos los campos...", 'bottom');
        } else {
            this.loadingProvider.preload("Guardando cita<br>Creando recordatorio...");
            setTimeout(() => {
                this.navCtrl.pop();
            }, 1400);
        }
    }

}
