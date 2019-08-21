import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, AlertController } from 'ionic-angular';

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

    directionType: string = "perfil";
    fabCitas: boolean = true;

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
        this.getCitas();
    }

    resize() {
        this.textAreaResize.nativeElement.style.height = this.textAreaResize.nativeElement.scrollHeight + 'px';
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

    hiddenCitasFab() {
        this.fabCitas = true;
    }
    showCitasFab() {
        this.fabCitas = false;
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

}
