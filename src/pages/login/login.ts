import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingPage } from '../loading/loading';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    continue: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ingresarApp() {
        this.continue = true;
        // setTimeout(() => {
        this.navCtrl.setRoot(LoadingPage, {
            message: 'Guardando tu nombre, solo será unos segundos',
            reference: 'login'
        });
        // }, 500);
    }

}
