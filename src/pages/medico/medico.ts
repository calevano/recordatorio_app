import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MedicoDetallePage } from '../medico-detalle/medico-detalle';

@Component({
    selector: 'page-medico',
    templateUrl: 'medico.html',
})
export class MedicoPage {

    medicoDetalle = MedicoDetallePage;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoPage');
    }

}
