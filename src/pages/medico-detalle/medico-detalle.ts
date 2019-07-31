import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { CallNumber } from '@ionic-native/call-number';
import { MedicoCitaCrearPage } from '../medico-cita-crear/medico-cita-crear';

@Component({
    selector: 'page-medico-detalle',
    templateUrl: 'medico-detalle.html',
})
export class MedicoDetallePage {

    directionType: string = "perfil";
    fabCitas: boolean = true;

    constructor(
        public platform: Platform,
        public toastProvider: ToastProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        private callNumber: CallNumber,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoDetallePage');
    }

    hiddenCitasFab() {
        this.fabCitas = true;
    }
    showCitasFab() {
        this.fabCitas = false;
    }

    callMedico() {
        let numero_ = "956560360";
        if (this.platform.is('cordova')) {
            this.callNumber.callNumber(numero_, true)
                .then(() => console.log('Llamando'))
                .catch(() => console.log('Error LLamada'));
        } else {
            this.toastProvider.showToast("dark", "MEDIANTE LA APP " + numero_, 'bottom');
        }
    }

    sendEmailMedico() {
        let url = "mailto:calevano@gmail.com";
        window.open(url, "_system", "location = no");
    }

    addCitaMedico() {
        this.navCtrl.push(MedicoCitaCrearPage);
    }

}
