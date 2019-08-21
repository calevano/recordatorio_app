import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastProvider } from '../../providers/toast/toast';

import { DatabaseProvider } from '../../providers/database/database';
import { HoyMedicamentoCrearPage } from '../hoy-medicamento-crear/hoy-medicamento-crear';

@Component({
    selector: 'page-hoy-medicamento',
    templateUrl: 'hoy-medicamento.html',
})
export class HoyMedicamentoPage {

    medicamentoForm: FormGroup;
    hoyMedicamentoCrear = HoyMedicamentoCrearPage;

    showOpciones: boolean = false;
    showPregunta: boolean = false;
    showFormulario: boolean = false;

    medicamentos: any = [];
    medicamentoTexto: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public formBuilder: FormBuilder,
        public databaseProvider: DatabaseProvider,
    ) {
        this.medicamentoForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HoyMedicamentoPage');
    }

    searchMedicamento(ev: any) {
        let val = ev.target.value;
        if (val) {
            console.log("searchMedicamento:::", val);
            if (val.length < 3) {
                this.showOpciones = false;
            } else {
                this.databaseProvider.searchMedicamento(val).then((res) => {
                    console.log("getAllMedicamento:::res:::", res);
                    if (res.length === 0) {
                        this.showOpciones = true;
                        this.showPregunta = true;
                        this.medicamentos = [];
                    } else {
                        this.showOpciones = false;
                        this.showPregunta = false;
                        this.medicamentos = res;
                        console.log("Listado de medicamentos:::", this.medicamentos);
                    }
                }).catch((err) => {
                    console.log("getAllMedicamento:::err:::", err);
                    this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
                });
            }
        } else {
            this.showOpciones = false;
            this.showPregunta = false;
            this.showFormulario = false;
            this.medicamentos = [];
            console.log("no hay data");
        }
    }

    searchCancel(ev?: any) {
        console.log("onCancel:::");
        this.showOpciones = false;
        this.showPregunta = false;
        this.showFormulario = false;
    }

    addMedicamento() {
        if (this.medicamentoForm.valid) {
            console.log("medicamentoNuevo:::", this.medicamentoForm);
            this.databaseProvider.insertMedicamento(this.medicamentoForm.value).then((res) => {
                console.log("addMedicamento:::res:::", res);
                this.toastProvider.show("success", "Se agrego el medicamento", 'bottom');
                this.medicamentoForm.reset();
                this.searchCancel();
            }).catch((err) => {
                console.log("addMedicamento:::err:::", err);
                this.toastProvider.show("error", "No se pudo agregar. favor de intentarlo de nuevo", 'bottom');
                this.searchCancel();
            });
        }
    }

    mostrarFormulario() {
        this.showPregunta = false;
        this.showFormulario = true;
        this.medicamentoForm = this.formBuilder.group({
            name: [this.medicamentoTexto],
        });
        this.medicamentoTexto = "";
    }

    cancelarFormulario() {
        this.showFormulario = false;
        this.medicamentoTexto = "";
    }

    cancelar() {
        this.navCtrl.pop();
    }

}
