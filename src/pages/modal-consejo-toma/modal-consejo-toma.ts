import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
    selector: 'page-modal-consejo-toma',
    templateUrl: 'modal-consejo-toma.html',
})
export class ModalConsejoTomaPage {

    consejoToma: any = "Ninguna";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
        let consejoToma_ = navParams.get('consejoToma');
        if (consejoToma_ !== "") {
            this.consejoToma = consejoToma_;
        }
    }

    ionViewDidLoad() {
        console.log('ModalConsejoTomaPage:::ionViewDidLoad');
    }

    selectOpcion() {
        let data = { 'consejoToma': this.consejoToma };
        this.viewCtrl.dismiss(data);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
