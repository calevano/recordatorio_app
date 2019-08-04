import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoyMedicamentoPage } from '../hoy-medicamento/hoy-medicamento';

@Component({
    selector: 'page-hoy',
    templateUrl: 'hoy.html',
})
export class HoyPage {

    hoyMedicamento = HoyMedicamentoPage;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HoyPage');
    }

}
