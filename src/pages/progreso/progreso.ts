import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-progreso',
    templateUrl: 'progreso.html',
})
export class ProgresoPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProgresoPage');
    }

}
