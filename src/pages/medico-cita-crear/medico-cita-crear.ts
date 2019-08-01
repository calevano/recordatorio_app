import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';

import * as moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-medico-cita-crear',
    templateUrl: 'medico-cita-crear.html',
})
export class MedicoCitaCrearPage {

    continue: boolean = false;
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
        public loadingProvider: LoadingProvider
    ) {
        this.date = moment().format('YYYY-MM-DD');
        this.data.fecha = this.date;
        this.data.hora = moment().format('hh:mm');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoCitaCrearPage');
    }

    saveCita() {
        this.loadingProvider.preload("Guardando cita<br>Creando recordatorio...");
        setTimeout(() => {
            this.navCtrl.pop();
        }, 1400);
    }

}
