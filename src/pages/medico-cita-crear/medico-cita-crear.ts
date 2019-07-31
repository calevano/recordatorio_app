import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        // moment.locale('es');
        let probando = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("probando:::", probando);
        this.date = moment().format('YYYY-MM-DD');
        console.log("date:::", this.date);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoCitaCrearPage');
    }

}
