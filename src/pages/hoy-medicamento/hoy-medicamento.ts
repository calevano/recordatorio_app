import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-hoy-medicamento',
    templateUrl: 'hoy-medicamento.html',
})
export class HoyMedicamentoPage {

    showAddMedicina: boolean = false;
    isRealText: string = "";

    medicamentoForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public formBuilder: FormBuilder,
    ) {
        this.medicamentoForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HoyMedicamentoPage');
    }

    searchMedicamento(ev: any) {
        console.log("ev:::", ev);
        let val = ev.target.value;
        if (val) {
            console.log("length:::", val.length);
            console.log("searchMedicamento:::", val);
            if (val.length < 3) {
                console.log();
                this.isRealText = "Esconder";
                this.showAddMedicina = false;
            } else {
                console.log("agregando ");
                this.isRealText = "Mostrar";
                this.showAddMedicina = false;
            }
        } else {
            this.isRealText = "";
            this.showAddMedicina = false;
            console.log("no hay data");
        }
    }

    searchCancel(ev: any) {
        console.log("onCancel:::");
    }

    addMedicamento() {
        if (!this.medicamentoForm.valid) {
            this.toastProvider.showToast("dark", "Debes ingresar un nombre", 'bottom');
        } else {
            setTimeout(() => {
                this.toastProvider.showToast("success", "Se agrego el medicamento", 'bottom');
            }, 500);
        }
    }

}
