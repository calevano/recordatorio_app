import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-hoy-medicamento',
    templateUrl: 'hoy-medicamento.html',
})
export class HoyMedicamentoPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HoyMedicamentoPage');
    }

    searchMedicamento() {

    }

}
