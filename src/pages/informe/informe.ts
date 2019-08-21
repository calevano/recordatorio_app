import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingPage } from '../loading/loading';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-informe',
    templateUrl: 'informe.html',
})
export class InformePage {

    informeForm: FormGroup;
    emailPattern = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,6}";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public formBuilder: FormBuilder
    ) {
        this.informeForm = this.formBuilder.group({
            anio: ['', Validators.compose([Validators.required])],
            mes: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InformePage');
    }

    sendEmail() {

        if (!this.informeForm.valid) {
            this.toastProvider.show("dark", "Todos los campos son requeridos", 'bottom');
        } else {
            this.navCtrl.setRoot(LoadingPage, {
                message: 'Estamos preparando todo para enviar el informe al correo ',
                reference: 'informe',
                parameters: {
                    email: this.informeForm.value.email
                }
            });
        }
    }

}
