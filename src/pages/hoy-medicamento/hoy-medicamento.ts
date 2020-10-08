import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Pages
import { HoyMedicamentoCrearPage } from '../hoy-medicamento-crear/hoy-medicamento-crear';
// Providers
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
    selector: 'page-hoy-medicamento',
    templateUrl: 'hoy-medicamento.html',
})
export class HoyMedicamentoPage {

    @ViewChild('inputSelect') inputSelect: any;
    @ViewChild('searchBar') searchBar: any;
    @ViewChild(Content) content: Content;

    medicamentoForm: FormGroup;
    hoyMedicamentoCrear = HoyMedicamentoCrearPage;

    showPregunta = false;
    showFormulario = false;

    medicamentos: any = [];
    medicamentoTexto: string;
    titleView = 'Seleccione un medicamento';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
        public formBuilder: FormBuilder,
        public databaseProvider: DatabaseProvider
    ) {
        this.medicamentoForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });
    }

    ionViewDidLoad() {
        // console.log('HoyMedicamentoPage:::ionViewDidLoad');
        this.initSearchBar();
    }

    ionViewWillEnter() {
        this.getAllMedicinas();
    }

    initSearchBar() {
        // this.resizeContent();
        this.content.resize();
        setTimeout(() => {
            this.searchBar.setFocus()
        }, 500);
    }

    async getAllMedicinas() {
        this.medicamentos = [];
        const orderBy = ' ORDER BY id DESC LIMIT 10';
        await this.databaseProvider.getAllMedicamento(orderBy).then(response => {
            // console.log('getAllMedicamento:::res:::', response);
            this.medicamentos = (response.length === 0) ? [] : response;
        }).catch(err => {
            console.log('getAllMedicinas:::err:::', err);
        });
    }

    async searchMedicamento(ev: any) {
        // console.log('searchMedicamento:::ev:::', ev);
        let val = ev.target.value;
        if (val !== '') {
            if (val.length > 2) {
                await this.databaseProvider.searchMedicamento(val).then(response => {
                    if (response.length === 0) {
                        this.titleView = '¿Quieres agregarlo?';
                        this.showPregunta = true;
                        this.medicamentos = [];
                    } else {
                        this.showPregunta = false;
                        this.medicamentos = response;
                    }
                    // console.log('response:::medicamentos:::', this.medicamentos);
                }).catch(err => {
                    console.log('searchMedicamento:::err:::', err);
                    this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
                });
            }
        } else {
            this.searchCancel();
            this.medicamentos = [];
        }
    }

    searchCancel() {
        this.showPregunta = false;
        this.showFormulario = false;
    }

    async addMedicamento() {
        if (!this.medicamentoForm.valid) {
            this.toastProvider.show('error', 'Debe ingresar el nombre del medicamento', 'bottom');
        } else {
            let dataForm_ = this.medicamentoForm.value;
            let nameTrim = dataForm_.name.trim();
            if (nameTrim === "") {
                this.toastProvider.show('error', 'Debe ingresar el nombre del medicamento', 'bottom');
            } else {
                let data_ = {};
                data_['name'] = nameTrim;
                this.loadingProvider.show("Agregando medicamento");
                // console.log("addMedicamento:::data:::", data_);
                await this.databaseProvider.insertMedicamento(data_).then(response => {
                    this.toastProvider.show('success', 'Se agrego el medicamento', 'bottom');
                    this.medicamentoTexto = nameTrim;
                    this.medicamentoForm.reset();
                    this.getMedicamentoAfterAddMedicamento(response.insertId);
                    this.searchCancel();
                    this.loadingProvider.hide(0);
                }).catch((err) => {
                    // console.log('addMedicamento:::err:::', err);
                    this.toastProvider.show('error', 'No se pudo agregar. favor de intentarlo de nuevo', 'bottom');
                    this.searchCancel();
                    this.loadingProvider.hide(0);
                });
            }
        }
    }

    async getMedicamentoAfterAddMedicamento(id: number) {
        await this.databaseProvider.showMedicamento(id).then(response => {
            this.navCtrl.push(HoyMedicamentoCrearPage, { 'medicamento': response });
        }).catch(err => {
            console.log('getMedicamentoAfterAddMedicamento:::err:::', err);
            this.toastProvider.show("error", "No se pudo obtener el medicamento agregado", 'bottom');
        });
    }

    mostrarFormulario() {
        this.titleView = 'Agregar medicamento';
        this.medicamentoTexto = '';
        this.showFormulario = true;
        this.showPregunta = false;
        this.medicamentoForm = this.formBuilder.group({
            name: [this.medicamentoTexto],
        });
        this.content.resize();
        setTimeout(() => {
            this.inputSelect.setFocus();
        }, 500);
    }

    cancelarFormulario() {
        this.showFormulario = false;
        this.medicamentoTexto = '';
        this.getAllMedicinas();
        this.resizeContent();
    }

    resizeContent() {
        this.content.resize();
        setTimeout(() => {
            this.searchBar.setFocus()
        }, 400);
    }

    cancelar() {
        this.navCtrl.pop();
    }

}
