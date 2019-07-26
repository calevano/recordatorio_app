import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HoyMedicamentoCrearPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hoy-medicamento-crear',
  templateUrl: 'hoy-medicamento-crear.html',
})
export class HoyMedicamentoCrearPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoyMedicamentoCrearPage');
  }

}
