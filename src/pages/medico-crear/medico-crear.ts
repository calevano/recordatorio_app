import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-medico-crear',
    templateUrl: 'medico-crear.html',
})
export class MedicoCrearPage {

    addMedicoForm: FormGroup;
    emailPattern = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,6}";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
        public formBuilder: FormBuilder,
    ) {
        this.addMedicoForm = this.formBuilder.group({
            nombres: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            especialidad: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            telefono: ['', Validators.compose([Validators.required, Validators.minLength(9)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoCrearPage');
    }

    saveMedico() {
        if (!this.addMedicoForm.valid) {
            this.toastProvider.showToast("dark", "Debes ingresar un nombre", 'bottom');
        } else {
            this.loadingProvider.preload("Agregando médico...");
            setTimeout(() => {
                this.navCtrl.pop();
            }, 1400);
        }
    }

}
