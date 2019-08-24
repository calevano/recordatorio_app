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
    @ViewChild(Content) content: Content;
    @ViewChild('mySlider') slider: Slides;

    previus: boolean = false;
    next: boolean = true;

    selectedSegment: string;

    isSearchbarOpened: boolean = false;
    isButtonSearchVisibility: boolean = false;

    page: string = "perfil";
    fabCitas: boolean = false;

    medico: any;
    citas: any = [];

    medicoCitaCrear = MedicoCitaCrearPage;

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

        let init_one = this.slider.isBeginning();
        console.log("init_one:::", init_one);
        let current_one = this.slider.getActiveIndex();
        console.log("current_one:::", current_one);
        let end_one = this.slider.isEnd();
        console.log("end_one:::", end_one);

        if (end_one) {
            console.log("IF END:::", end_one);
            this.slider.lockSwipes(false);
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(true);
        }

        this.getCitas();
    }

    ionViewDidEnter() {
        this.slideAutoplay();
    }

    async getCitas() {
        this.citas = [];
        await this.databaseProvider.getAllCitas(this.medico).then((res) => {
            console.log("getCitas:::res:::", res);
            if (res.length === 0) {
                this.citas = [];
            } else {
                this.citas = res;
                console.log("Listado de citas:::", this.citas);
            }
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
        this.content.resize();
    }

    openedSearch() {
        this.isSearchbarOpened = true;
        this.content.resize();
    }

    slideAutoplay() {
        this.slider.lockSwipeToPrev(true);
    }

    segmentChanged(ev: any) {
        console.log("ev:::", ev);
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

    onSlideChanged(ev: any) {
        console.log('Slide changed:::', ev);
        let init_ = this.slider.isBeginning();
        console.log("init_:::", init_);
        let current_ = this.slider.getActiveIndex();
        console.log("current_:::", current_);
        let end_ = this.slider.isEnd();
        console.log("end_:::", end_);
        if (init_) {
            console.log("IF INIT");
            this.slider.lockSwipeToPrev(true);
            this.slider.lockSwipeToNext(false);
        }

        if (current_ === 0) {
            console.log("IF CURRENT:::", current_);
            this.slider.lockSwipeToNext(false);
            this.isButtonSearchVisibility = false;
            this.fabCitas = false;
            this.page = 'perfil';
            this.cancelSearch();
        } else {
            console.log("ELSE CURRENT:::", current_);
            this.slider.lockSwipes(false);
            // if (current_ === 1) {
            this.isButtonSearchVisibility = true;
            this.fabCitas = true;
            this.page = 'citas';
            // }
        }

        if (end_) {
            console.log("IF END:::", end_);
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(true);
        }
    }

}
