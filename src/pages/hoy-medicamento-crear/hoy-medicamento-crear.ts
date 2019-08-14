import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalConsejoTomaPage } from '../modal-consejo-toma/modal-consejo-toma';
import { ModalDuracionFechaPage } from '../modal-duracion-fecha/modal-duracion-fecha';

import * as moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-hoy-medicamento-crear',
    templateUrl: 'hoy-medicamento-crear.html',
})
export class HoyMedicamentoCrearPage {

    medicamento: any;
    note: string = "";
    day_duration: string = "";
    dayDurationText: string = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController
    ) {
        this.medicamento = navParams.get('medicamento');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HoyMedicamentoCrearPage');
    }

    modalConsejo() {
        let consejoTomaModal = this.modalCtrl.create(ModalConsejoTomaPage, { consejoToma: this.note });
        consejoTomaModal.onDidDismiss(data => {
            if (typeof data !== "undefined") {
                console.log("modalConsejo:::data:::", data);
                this.note = data.consejoToma;
            } else {
                console.log("modalConsejo:::data:::NOVALUE:::");
            }
        });
        consejoTomaModal.present();
    }

    modalDuracion() {
        let duracionFecha = this.modalCtrl.create(ModalDuracionFechaPage);
        duracionFecha.onDidDismiss(data => {
            if (typeof data !== "undefined") {
                console.log("modalDuracion:::data:::", data);
                if (data.opcion === 1) {
                    this.dayDurationText = "Solo el " + data.only;
                    this.day_duration = data.only;
                } else {
                    this.dayDurationText = "Desde el " + data.inicio + " Hasta el " + data.final;
                    this.day_duration = data.final;
                    let arrayDias: any = [];
                    let cantidadDias: number = data.final.diff(data.inicio, 'days');
                    console.log(cantidadDias + ' dias de diferencia');
                    for (let i = 0; i < cantidadDias; i++) {
                        arrayDias[i] = moment().add((i + 1), 'days').format('YYYY-MM-DD');
                    }
                    console.log('arrayDias:::', arrayDias);
                }

            } else {
                console.log("modalDuracion:::data:::NOVALUE:::");
            }
        });
        duracionFecha.present();
    }

}
