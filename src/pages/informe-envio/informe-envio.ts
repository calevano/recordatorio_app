import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-informe-envio',
    templateUrl: 'informe-envio.html',
})
export class InformeEnvioPage {

    email: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.email = navParams.get('email');
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad InformeEnvioPage');
    }

    backButton() {
        this.navCtrl.setRoot(TabsPage);
    }

}
