import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingPage } from '../loading/loading';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-informe',
    templateUrl: 'informe.html',
})
export class InformePage {

    continue: boolean = false;
    data: any = {
        anio: '',
        mes: '',
        email: ''
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InformePage');
    }

    ionViewDidLeave() {
        this.data.email = '';
    }

    sendEmail() {
        console.log("thisData:::", this.data);

        if (this.data.anio === "" ||
            this.data.mes === "" ||
            this.data.email === "") {
            this.toastProvider.showToast("warning", "TODOS LOS CAMPOS SON REQUERIDOS");
        } else {
            this.continue = true;
            this.navCtrl.setRoot(LoadingPage, {
                message: 'Estamos preparando todo para enviar el informe al correo ',
                reference: 'informe',
                parameters: {
                    email: this.data.email
                }
            });
        }
    }

}
