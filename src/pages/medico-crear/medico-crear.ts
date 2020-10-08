import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
    selector: 'page-medico-crear',
    templateUrl: 'medico-crear.html',
})
export class MedicoCrearPage {

    optionImageMedicoDefault = 'assets/imgs/random/doctor-men.svg';
    addMedicoForm: FormGroup;
    emailPattern = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,6}";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
        public formBuilder: FormBuilder,
        public databaseProvider: DatabaseProvider,
    ) {
        this.addMedicoForm = this.formBuilder.group({
            names: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            speciality: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            phone: ['', Validators.compose([Validators.minLength(9)])],
            email: ['', Validators.compose([Validators.pattern(this.emailPattern)])],
            prefix: ['dr', Validators.compose([Validators.required])],
        });
    }

    ionViewDidLoad() {
        // console.log('MedicoCrearPage ionViewDidLoad');
    }

    selectOptionDr(event: any) {
        this.optionImageMedicoDefault = 'assets/imgs/random/doctor-' + (event === 'dra' ? 'wo' : '') + 'men.svg';
    }

    async saveMedico() {
        if (this.addMedicoForm.valid) {
            this.loadingProvider.show("Agregando médico...");
            await this.databaseProvider.insertMedico(this.addMedicoForm.value).then((res) => {
                // setTimeout(() => {
                this.toastProvider.show("success", "Se agrego el médico correctamente", 'bottom');
                this.addMedicoForm.reset();
                this.loadingProvider.hide(0);
                this.navCtrl.pop();
                // }, 500);
            }).catch((err) => {
                this.toastProvider.show("error", "No se pudo agregar, favor de intentarlo de nuevo", 'bottom');
                this.loadingProvider.hide(0);
            });
        }
    }

}
