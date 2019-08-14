import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import * as moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-modal-duracion-fecha',
    templateUrl: 'modal-duracion-fecha.html',
})
export class ModalDuracionFechaPage {

    dateOnly: any;
    dateInit: any;
    dateEnd: any;

    data: any = {
        only: '',
        inicio: '',
        final: '',
        opcionDia: '0'
    };

    showOnlyDate: boolean = true;
    showSelectDate: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
        this.dateOnly = moment().format('YYYY-MM-DD');
        this.data.only = this.dateOnly;
        console.log("this.dateOnly:::", this.dateOnly);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalDuracionFechaPage');
    }

    selectOptionDay(option_: number) {
        if (option_ === 0) {
            this.showOnlyDate = true;
            this.showSelectDate = false;

            this.dateOnly = moment().format('YYYY-MM-DD');
            this.data.only = this.dateOnly;

            console.log("this.dateOnly:::", this.dateOnly);

            this.data.inicio = "";
            this.data.final = "";
        } else {
            this.showOnlyDate = false;
            this.showSelectDate = true;

            this.dateInit = moment().format('YYYY-MM-DD');
            this.dateEnd = moment().add(1, 'days').format('YYYY-MM-DD');

            console.log("this.dateInit:::", this.dateInit);
            console.log("this.dateEnd:::", this.dateEnd);

            this.data.only = "";
            this.data.inicio = this.dateInit;
            this.data.final = this.dateEnd;
        }
    }

    changeDateInit(ev: any) {
        console.log("changeDateInit:::ev:::", ev);
        console.log("changeDateInit:::ev:::day:::", ev.day);
        console.log("changeDateInit:::ev:::month:::", ev.month);
        console.log("changeDateInit:::ev:::year:::", ev.year);
        let date_ = ev.day + '-' + ev.month + '-' + ev.year;
        console.log("changeDateInit:::ev:::date_", date_);

        let init_ = new Date(date_);
        console.log("changeDateInit:::init_:::", init_);
        let end_ = new Date(this.dateEnd);
        console.log("changeDateInit:::end_:::", end_);
        if (init_ > end_) {
            console.log("init_ es mayor que end_");
        } else {
            console.log("end_ es mayor que init_");
        }
    }

    selectOpcion() {
        let data: any;
        if (this.data.opcionDia === 0) {
            data = { 'opcion': 0, 'only': this.data.only };
        } else {
            data = { 'opcion': 1, 'inicio': this.data.inicio, 'final': this.data.final };
        }
        this.viewCtrl.dismiss(data);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
