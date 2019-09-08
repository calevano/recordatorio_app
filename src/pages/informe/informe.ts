import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Pages
import { LoadingPage } from '../loading/loading';
// Providers
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
    selector: 'page-informe',
    templateUrl: 'informe.html',
})
export class InformePage {

    informeForm: FormGroup;
    emailPattern = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,6}";

    anioMes: any = [];
    anios: any = [];
    meses: any = [];
    loadInit: boolean = true;

    constructor(
        public navCtrl: NavController,
        public toastProvider: ToastProvider,
        public databaseProvider: DatabaseProvider,
        public formBuilder: FormBuilder
    ) {
        this.informeForm = this.formBuilder.group({
            anio: ['', Validators.compose([Validators.required])],
            mes: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]
        });
    }

    ionViewDidLoad() { }

    ionViewWillEnter() {
        this.getDataInforme();
    }

    async getDataInforme() {
        this.anioMes = [];
        this.anios = [];
        this.meses = [];
        this.loadInit = true;
        await this.databaseProvider.getDataInforme().then((response) => {
            console.log("InformePage:::getDataInforme:::response:::", response);
            let response_ = response;
            if (response_.length === 0) {
                this.anioMes = [];
            } else {
                let anioMesFilter = [];
                for (let day of response_) {
                    let durationSplit_ = day.day_duration.split('-');
                    let anioMes_ = durationSplit_[0] + '-' + durationSplit_[1];
                    anioMesFilter.push({ anioMes: anioMes_ });
                }
                const anioMes_ = Array.from(new Set(anioMesFilter.map(s => s.anioMes))).map(anioMes => {
                    let resultAnioMes_ = anioMes.split('-');
                    return {
                        anioMes: anioMes,
                        anio: resultAnioMes_[0],
                        mes: resultAnioMes_[1]
                    };
                });
                this.anioMes = anioMes_;
                const anios_ = Array.from(new Set(anioMes_.map(s => s.anio))).map(anio => {
                    return {
                        anio: anio,
                    };
                });
                this.anios = anios_;
            }
            this.loadInit = false;
        }).catch((err) => {
            console.log("InformePage:::getDataInforme:::err:::", JSON.stringify(err));
            this.toastProvider.show("error", "Porfavor intenta otra vez", "bottom");
        });
    }

    changeAnio(anio_: any) {
        let anioMes_ = this.anioMes;
        let meses_ = [];
        for (let i = 0; i < anioMes_.length; i++) {
            if (anioMes_[i].anio === anio_) {
                meses_.push({ mes: anioMes_[i].mes });
            }
        }
        this.meses = meses_;
    }

    sendEmail() {
        console.log('InformePage:::sendEmail');
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
