import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
    selector: 'page-medico-editar',
    templateUrl: 'medico-editar.html',
})
export class MedicoEditarPage {

    editMedicoForm: FormGroup;
    emailPattern = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,6}";
    medico: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
        public formBuilder: FormBuilder,
        public databaseProvider: DatabaseProvider,
    ) {
        this.medico = navParams.get('medico');
        console.log("MedicoEditarPage:::construct:::thisMedico:::", this.medico);
        this.editMedicoForm = this.formBuilder.group({
            names: [this.medico.names, Validators.compose([Validators.required, Validators.minLength(6)])],
            speciality: [this.medico.speciality, Validators.compose([Validators.required, Validators.minLength(6)])],
            phone: [this.medico.phone, Validators.compose([Validators.minLength(9)])],
            email: [this.medico.email, Validators.compose([Validators.pattern(this.emailPattern)])],
            prefix: [this.medico.prefix, Validators.compose([Validators.required])],
        });
    }

    ionViewDidLoad() {
        console.log('MedicoEditarPage ionViewDidLoad');
    }

    editMedico() {
        if (this.editMedicoForm.valid) {
            this.loadingProvider.show("Editando médico...");
            let data_ = this.editMedicoForm.value;
            data_['id'] = this.medico.id;
            console.log("MedicoEditarPage:::editMedico:::data:::", data_);
            this.databaseProvider.updateMedico(data_).then((response) => {
                setTimeout(() => {
                    this.toastProvider.show("success", "Se edito al médico correctamente", 'bottom');
                    this.editMedicoForm.reset();
                    this.loadingProvider.hide(0);
                    this.navCtrl.getPrevious().data.medicoUpdate = data_;
                    this.navCtrl.pop();
                }, 500);
            }).catch((err) => {
                this.toastProvider.show("error", "No se pudo editar. favor de intentarlo de nuevo", 'bottom');
                this.loadingProvider.hide(0);
            });
        }
    }

}
