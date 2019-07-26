import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-loading',
    templateUrl: 'loading.html',
})
export class LoadingPage {

    message: string;
    reference: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.message = navParams.get('message');
        this.reference = navParams.get('reference');
        let type: any;
        switch (this.reference) {
            case 'login':
                type = TabsPage
                break;
            // case 'profile-me':
            //     type = ProfilePage
            //     break;
        }

        setTimeout(() => {
            this.navCtrl.setRoot(type);
        }, 2000);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoadingPage');
    }

}
