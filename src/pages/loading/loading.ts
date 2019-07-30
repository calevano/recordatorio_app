import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { InformeEnvioPage } from '../informe-envio/informe-envio';

@Component({
    selector: 'page-loading',
    templateUrl: 'loading.html',
})
export class LoadingPage {

    message: string;
    reference: any;
    parameters: any;
    app: boolean = false;

    constructor(
        public appCtrl: App,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.message = navParams.get('message');
        this.reference = navParams.get('reference');
        this.parameters = navParams.get('parameters');
        let type: any;
        let option: any = {};
        switch (this.reference) {
            case 'login':
                type = TabsPage;
                break;
            case 'informe':
                this.app = true;
                type = InformeEnvioPage;
                option = {
                    email: this.parameters.email
                };
                break;
        }

        setTimeout(() => {
            if (this.app) {
                this.appCtrl.getRootNav().setRoot(type, option);
            } else {
                this.navCtrl.setRoot(type, option);
            }
        }, 2000);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoadingPage');
    }

}
