import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { MedicoDetallePage } from '../medico-detalle/medico-detalle';
import { MedicoCrearPage } from '../medico-crear/medico-crear';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-medico',
    templateUrl: 'medico.html',
})
export class MedicoPage {

    @ViewChild(Content) content: Content;
    @ViewChild('searchBar') myInput: any;

    isSearchbarOpened: boolean = false;
    isButtonSearchVisibility: boolean = false;

    loadInit: boolean = true;
    medicosZero: boolean = true;

    medicoDetalle = MedicoDetallePage;
    medicoCrear = MedicoCrearPage;

    medicos: any = [];
    searchMedicos: any = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoPage');
    }

    ionViewWillEnter() {
        this.getAllMedicos();
    }

    getMedicosSearch() {
        this.medicos = this.searchMedicos;
    }

    cancelSearch() {
        setTimeout(() => {
            this.isSearchbarOpened = false;
            this.content.resize();
        }, 300);
    }

    openedSearch() {
        this.isSearchbarOpened = true;
        this.content.resize();
        setTimeout(() => {
            this.myInput.setFocus();
        }, 150);
    }

    // detalleMedico(){
    //     this.navCtrl();
    // }

    async deleteMedico(id_: any) {
        await this.databaseProvider.deleteMedico(id_).then((res) => {
            console.log("deleteMedico:::res:::", res);
        }).catch((err) => {
            console.log("deleteMedico:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

    async getAllMedicos() {
        this.medicos = [];
        this.loadInit = true;
        await this.databaseProvider.getAllMedicos().then((response) => {
            this.loadInit = false;
            console.log("getAllMedicos:::response:::", response);
            if (response.length === 0) {
                this.medicos = [];
                this.medicosZero = true;
            } else {
                this.medicosZero = false;
                this.medicos = response;
                this.searchMedicos = response;
                this.content.resize();
                console.log("Listado de medicos:::", this.medicos);
            }
        }).catch((err) => {
            console.log("getAllMedicos:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

    getItems(ev: any) {
        this.getMedicosSearch();
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.medicos = this.medicos.filter((item: any) => {
                return (item.names.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

}
