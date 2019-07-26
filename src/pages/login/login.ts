import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
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
        // this.loadingProvider.preload("Ingresando...");
        setTimeout(() => {
            // this.navCtrl.setRoot(TabsPage);
            this.navCtrl.setRoot(LoadingPage, {
                message: 'Guardando tu nombre, solo será unos segundos',
                reference: 'login'
            });
        }, 1000);



    }

}
