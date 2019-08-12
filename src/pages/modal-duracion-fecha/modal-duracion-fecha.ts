import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import * as moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-modal-duracion-fecha',
    templateUrl: 'modal-duracion-fecha.html',
})
export class ModalDuracionFechaPage {

    dateInit: any;
    dateEnd: any;

    data: any = {
        inicio: '',
        final: '',
        dias: ''
    };

    showEndDate: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
        this.dateInit = moment().format('YYYY-MM-DD');
        this.data.inicio = this.dateInit;
        console.log("this.dateInit:::", this.dateInit);
        this.dateEnd = moment().add(1, 'days').format('YYYY-MM-DD');
        console.log("this.dateEnd:::", this.dateEnd);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalDuracionFechaPage');
    }

    showDateEnd(opcion: number) {
        this.data.final = "";
        this.showEndDate = (opcion === 1) ? true : false;
    }

    selectOpcion() {
        let dayDuration_ = (this.data.final == "") ? this.data.inicio : this.data.final;
        let data = { 'dayDuration': dayDuration_ };
        this.viewCtrl.dismiss(data);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
