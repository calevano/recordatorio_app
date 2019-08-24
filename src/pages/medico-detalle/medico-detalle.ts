import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, AlertController, Content, Slides } from 'ionic-angular';

import { MedicoCitaCrearPage } from '../medico-cita-crear/medico-cita-crear';
import { MedicoCitaEditarPage } from '../medico-cita-editar/medico-cita-editar';

import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';

import { CallNumber } from '@ionic-native/call-number';

@Component({
    selector: 'page-medico-detalle',
    templateUrl: 'medico-detalle.html',
})
export class MedicoDetallePage {

    @ViewChild('textAreaResize') textAreaResize: ElementRef;
    @ViewChild('searchBar') myInput;
    @ViewChild(Content) content: Content;
    @ViewChild(Slides) slider: Slides;

    previus: boolean = false;
    next: boolean = true;

    selectedSegment: string;

    isSearchbarOpened: boolean = false;
    isButtonSearchVisibility: boolean = false;

    page: string = "perfil";
    fabCitas: boolean = false;
    citasZero: boolean = true;

    medico: any;
    citas: any = [];
    searchCitas: any = [];

    // medicoCitaCrear = MedicoCitaCrearPage;

    constructor(
        public platform: Platform,
        public toastProvider: ToastProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        private callNumber: CallNumber,
        public databaseProvider: DatabaseProvider,
        public actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        public loadingProvider: LoadingProvider,
    ) {
        this.medico = navParams.get('medico');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoDetallePage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter MedicoDetallePage');
        this.getCitas();
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter MedicoDetallePage');
    }

    medicoCreate(medico_: any) {
        this.navCtrl.push(MedicoCitaCrearPage, { 'medico': medico_ });
    }

    async getCitas() {
        this.citas = [];
        await this.databaseProvider.getAllCitas(this.medico).then((response) => {
            console.log("getCitas:::response:::", response);
            if (response.length === 0) {
                this.citas = [];
                this.citasZero = true;
            } else {
                this.citas = response;
                this.searchCitas = response;
                this.citasZero = false;
                console.log("Listado de citas:::", this.citas);
            }

            console.log("SearchCitas:::", this.searchCitas);
        }).catch((err) => {
            console.log("getCitas:::err:::", err);
            this.toastProvider.show("error", "Porfavor intenta buscando de nuevo", "bottom");
        });
    }

    callMedico(numero_: any) {
        if (this.platform.is('cordova')) {
            this.callNumber.callNumber(numero_, true)
                .then(() => console.log('Llamando'))
                .catch(() => console.log('Error LLamada'));
        } else {
            this.toastProvider.show("dark", "MEDIANTE LA APP " + numero_, 'bottom');
        }
    }

    getCitasSearch() {
        this.citas = this.searchCitas;
    }

    getItems(ev: any) {
        this.getCitasSearch();
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.citas = this.citas.filter((item: any) => {
                return (item.question.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    sendEmailMedico(email: any) {
        let url = "mailto:" + email;
        window.open(url, "_system", "location = no");
    }

    optionCita(cita_: any) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Acciones',
            subTitle: 'Usted podrá editar o eliminar la cita.',
            cssClass: 'action-sheets-cita',
            buttons: [
                {
                    text: 'Editar',
                    icon: !this.platform.is('ios') ? 'create' : null,
                    handler: () => {
                        console.log('Editar clicked');
                        this.editarCita(cita_);
                    }
                },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: () => {
                        console.log('Eliminar clicked');
                        this.eliminarCita(cita_.id);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancelando clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    editarCita(cita_: any) {
        this.navCtrl.push(MedicoCitaEditarPage, { cita: cita_ });
    }

    eliminarCita(id: number) {
        let alert = this.alertCtrl.create({
            title: 'Eliminar',
            message: '¿Está seguro de eliminar la cita?<br><br>Está acción no se podrá deshacer.',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si, eliminar',
                    handler: () => {
                        console.log('Eliminando clicked');
                        this.loadingProvider.show("Eliminando cita...");
                        this.databaseProvider.deleteCita(id).then((res) => {
                            console.log("eliminarCita:::res:::", res);
                            this.toastProvider.show("success", "Se elimino la cita correctamente", 'bottom');
                            this.loadingProvider.hide(0);
                            this.getCitas();
                        }).catch((err) => {
                            console.log("eliminarCita:::err:::", err);
                            this.toastProvider.show("error", "No se pudo eliminar. favor de intentarlo de nuevo", 'bottom');
                            this.loadingProvider.hide(0);
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    cancelSearch() {
        this.isSearchbarOpened = false;
        this.fabCitas = true;
        this.content.resize();
    }

    openedSearch() {
        this.isSearchbarOpened = true;
        this.fabCitas = false;
        this.content.resize();
        setTimeout(() => {
            this.myInput.setFocus();
        }, 150);
    }

    segmentChanged(ev: any) {
        console.log("segmentChanged:::ev:::", ev.value);
        this.fabCitas = false;
        switch (ev.value) {
            case 'perfil':
                this.fabCitas = false;
                this.isButtonSearchVisibility = false;
                this.slider.slideTo(0);
                break;
            case 'citas':
                this.fabCitas = true;
                this.isButtonSearchVisibility = true;
                this.slider.slideTo(1);
                break;
        }
    }

    slideDidChanged(ev: any) {
        this.fabCitas = false;
        console.log('slideDidChanged:::ev:::', ev);
        let currentIndex = this.slider.getActiveIndex();
        this.fabCitas = (currentIndex === 0) ? false : true;
        console.log('slideDidChanged:::currentIndex:::', currentIndex);
    }

    slideWillChanged(ev: any) {
        this.fabCitas = false;
        console.log('slideWillChanged:::ev:::', ev);
        let init_ = this.slider.isBeginning();
        console.log('slideWillChanged:::init_:::', init_);
        let current_ = this.slider.getActiveIndex();
        console.log('slideWillChanged:::current_:::', current_);
        let end_ = this.slider.isEnd();
        console.log('slideWillChanged:::end_:::', end_);

        if (init_) {
            this.slider.lockSwipeToPrev(true);
            this.slider.lockSwipeToNext(false);
        }

        if (current_ === 0) {
            this.slider.lockSwipeToNext(false);
            this.isButtonSearchVisibility = false;
            this.fabCitas = false;
            this.page = 'perfil';
            this.cancelSearch();
        } else {
            this.slider.lockSwipes(false);
            this.isButtonSearchVisibility = true;
            this.fabCitas = true;
            this.page = 'citas';
        }

        if (end_) {
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(true);
        }
    }
}
