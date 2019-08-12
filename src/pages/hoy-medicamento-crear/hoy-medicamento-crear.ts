import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalConsejoTomaPage } from '../modal-consejo-toma/modal-consejo-toma';
import { ModalDuracionFechaPage } from '../modal-duracion-fecha/modal-duracion-fecha';

@Component({
    selector: 'page-hoy-medicamento-crear',
    templateUrl: 'hoy-medicamento-crear.html',
})
export class HoyMedicamentoCrearPage {

    medicamento: any;
    note: string = "";
    day_duration: string = "";

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
            console.log("modalConsejo:::data:::", data);
            this.note = data.consejoToma;
        });
        consejoTomaModal.present();
    }


    modalDuracion() {
        let duracionFecha = this.modalCtrl.create(ModalDuracionFechaPage);
        duracionFecha.onDidDismiss(data => {
            console.log("modalDuracion:::data:::", data);
            this.day_duration = data.dayDuration;
        });
        duracionFecha.present();
    }

}
