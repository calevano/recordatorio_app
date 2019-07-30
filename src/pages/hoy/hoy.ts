import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-hoy',
    templateUrl: 'hoy.html',
})
export class HoyPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HoyPage');
    }

}
