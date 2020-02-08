import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, AlertController, Content, Slides, FabContainer } from 'ionic-angular';
// Pages
import { MedicoCitaCrearPage } from '../medico-cita-crear/medico-cita-crear';
import { MedicoCitaEditarPage } from '../medico-cita-editar/medico-cita-editar';
import { MedicoEditarPage } from '../medico-editar/medico-editar';
// Providers
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';
import { LocalNotificationProvider } from '../../providers/local-notification/local-notification';
// Plugins
import { CallNumber } from '@ionic-native/call-number';

@Component({
    selector: 'page-medico-detalle',
    templateUrl: 'medico-detalle.html',
})
export class MedicoDetallePage {

    @ViewChild('textAreaResize') textAreaResize: ElementRef;
    @ViewChild('searchBar') myInput: any;
    @ViewChild(Content) content: Content;
    @ViewChild(Slides) slider: Slides;

    previus: boolean = false;
    next: boolean = true;

    isSearchbarOpened: boolean = false;
    isButtonSearchVisibility: boolean = false;

    page: string = "perfil";
    fabCitas: boolean = false;
    fabPerfil: boolean = true;
    citasZero: boolean = true;

    titleHeader: string = "Detalle Médico";
    medico: any;
    citas: any = [];
    searchCitas: any = [];

    medicoCitaCrear = MedicoCitaCrearPage;
    medicoEditar = MedicoEditarPage;

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
        public localNotificationProvider: LocalNotificationProvider
    ) {
        this.medico = navParams.get('medico');
    }

    ionViewDidLoad() {
        this.slideAutoplay();
    }

    ionViewWillEnter() {
        let medicoUpdate_ = this.navParams.get('medicoUpdate') || null;
        if (medicoUpdate_ != null) {
            this.medico = medicoUpdate_;
        }
        this.getCitas();
    }

    slideAutoplay() {
        this.slider.lockSwipeToPrev(true);
    }

    async getCitas() {
        this.citas = [];
        await this.databaseProvider.getAllCitas(this.medico).then((response) => {
            if (response.length === 0) {
                this.citas = [];
                this.citasZero = true;
            } else {
                this.citas = response;
                this.searchCitas = response;
                this.citasZero = false;
            }
        }).catch((err) => {
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
                        this.editarCita(cita_);
                    }
                },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: () => {
                        this.eliminarCita(cita_.id);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => { }
                }
            ]
        });
        actionSheet.present();
    }

    editarCita(cita_: any) {
        this.navCtrl.push(MedicoCitaEditarPage, { 'cita': cita_, 'medico': this.medico });
        this.cancelSearch();
    }

    eliminarCita(id: number) {
        let alert = this.alertCtrl.create({
            title: 'Eliminar',
            message: '¿Está seguro de eliminar la cita?<br><br>Está acción no se podrá deshacer.',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Si, eliminar',
                    handler: () => {
                        this.cancelSearch();
                        this.loadingProvider.show("Eliminando cita");
                        this.databaseProvider.deleteCita(id).then(res => {
                            this.searchNotification('cita', id);
                            this.toastProvider.show("success", "Se elimino la cita correctamente", 'bottom');
                            this.loadingProvider.hide(0);
                            this.getCitas();
                        }).catch(err => {
                            this.toastProvider.show("error", "No se elimino. favor de intentarlo de nuevo", 'bottom');
                            this.loadingProvider.hide(0);
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    async searchNotification(type: any, foreign_id: any) {
        await this.databaseProvider.searchNotification(type, foreign_id).then(res => {
            // console.log('searchNotification:::res:::', res[0]);
            if (res.length === 1) {
                this.deleteNotification(res[0].id);
            }
        }).catch(err => {
            console.log('searchNotification:::err:::', err);
        });
    }

    async deleteNotification(id: any) {
        await this.localNotificationProvider.delete(id);
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

    closeFab(fab: FabContainer) {
        setTimeout(() => {
            fab.close();
        }, 300);
    }

    deleteMedico(id: number) {
        let alert = this.alertCtrl.create({
            title: 'Eliminar',
            message: '¿Está seguro de eliminar al médico<br><strong>"' + this.medico.names + '"</strong> ?<br><br>Está acción no se podrá deshacer.',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Si, eliminar',
                    handler: () => {
                        this.cancelSearch();
                        this.loadingProvider.show("Eliminando médico...");
                        this.databaseProvider.deleteMedico(id).then((res) => {
                            this.toastProvider.show("success", "Se elimino el médico correctamente", 'bottom');
                            this.loadingProvider.hide(0);
                            this.navCtrl.pop();
                        }).catch((err) => {
                            this.toastProvider.show("error", "No se pudo eliminar, favor de intentarlo de nuevo", "bottom");
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    segmentChanged(ev: any) {
        this.fabCitas = false;
        switch (ev.value) {
            case 'perfil':
                this.fabPerfil = true;
                this.fabCitas = false;
                this.titleHeader = "Detalle Médico";
                this.isButtonSearchVisibility = false;
                this.slider.slideTo(0);
                break;
            case 'citas':
                this.fabPerfil = false;
                this.fabCitas = true;
                this.titleHeader = "Listado de Citas";
                this.isButtonSearchVisibility = true;
                this.slider.slideTo(1);
                break;
        }
    }

    slideDidChanged(ev: any) {
        let currentIndex = this.slider.getActiveIndex();
        this.fabPerfil = (currentIndex === 0) ? true : false;
        this.fabCitas = (currentIndex === 0) ? false : true;
        this.titleHeader = (currentIndex === 0) ? "Detalle Médico" : "Listado de Citas";
    }

    slideWillChanged(ev: any) {
        let init_ = this.slider.isBeginning();
        let current_ = this.slider.getActiveIndex();
        let end_ = this.slider.isEnd();

        if (init_) {
            this.slider.lockSwipeToPrev(true);
            this.slider.lockSwipeToNext(false);
        }

        if (current_ === 0) {
            this.slider.lockSwipeToNext(false);
            this.isButtonSearchVisibility = false;
            this.fabCitas = false;
            this.fabPerfil = true;
            this.page = 'perfil';
            this.titleHeader = "Detalle Médico";
            this.cancelSearch();
        } else {
            this.slider.lockSwipes(false);
            this.isButtonSearchVisibility = true;
            this.fabCitas = true;
            this.fabPerfil = false;
            this.page = 'citas';
            this.titleHeader = "Listado de Citas";
        }

        if (end_) {
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(true);
        }
    }
}
