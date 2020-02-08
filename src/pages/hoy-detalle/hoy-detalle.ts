import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { LocalNotificationProvider } from '../../providers/local-notification/local-notification';

@Component({
    selector: 'page-hoy-detalle',
    templateUrl: 'hoy-detalle.html',
})
export class HoyDetallePage {

    recordatorio: any = {};

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
        public localNotificationProvider: LocalNotificationProvider
    ) {
        this.recordatorio = navParams.get('recordatorio');
        console.log('recordatorio:::', this.recordatorio);
    }

    ionViewDidLoad() {
        console.log('HoyDetallePage:::ionViewDidLoad');
    }

    async cancelar() {
        let alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: '¿Está seguro que desea cancelar la toma de este recordatorio?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Si, Cancelar',
                    handler: () => {
                        this.tomaRecordatorioTimes(0, 'cancelo');
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmar() {
        let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Está seguro que desea confirmar la toma de este recordatorio?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Si, Confirmar',
                    handler: () => {
                        this.tomaRecordatorioTimes(2, 'confirmo');
                    }
                }
            ]
        });
        await alert.present();
    }

    async tomaRecordatorioTimes(status: any, action: any) {
        const recordatorioId = this.recordatorio.id;
        let data_: any = {};
        data_.status = status;
        data_.id = recordatorioId;
        this.loadingProvider.show("Confirmando toma");
        this.databaseProvider.tomaRecordatorioTimes(data_).then(response => {
            this.searchNotification('recordatorio', recordatorioId);
            this.toastProvider.show("success", "Se " + action + " la toma del recordatorio", 'bottom');
            this.loadingProvider.hide(0);
            this.navCtrl.pop();
        }).catch(err => {
            this.toastProvider.show("error", "No se " + action + " la toma del recordatorio", 'bottom');
        });
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

}
