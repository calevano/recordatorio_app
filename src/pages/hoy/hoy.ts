import { Component } from '@angular/core';
import { NavController, ItemSliding, AlertController } from 'ionic-angular';
// Pages
import { HoyMedicamentoPage } from '../hoy-medicamento/hoy-medicamento';
import { HoyDetallePage } from '../hoy-detalle/hoy-detalle';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { LocalNotificationProvider } from '../../providers/local-notification/local-notification';
// Native
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
    selector: 'page-hoy',
    templateUrl: 'hoy.html',
})
export class HoyPage {

    hoyMedicamento = HoyMedicamentoPage;
    hoyDetalle = HoyDetallePage;

    recordatorios: any = [];
    loadInit: boolean = true;

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        public databaseProvider: DatabaseProvider,
        public loadingProvider: LoadingProvider,
        public toastProvider: ToastProvider,
        public localNotifications: LocalNotifications,
        public localNotificationProvider: LocalNotificationProvider
    ) {
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter() {
        this.getAllRecordatorio();
        // this.getAllNotifications();
    }

    async getAllRecordatorio() {
        this.recordatorios = [];
        this.loadInit = true;
        await this.databaseProvider.getAllRecordatorio().then(res => {
            // console.log('getAllRecordatorio:::res:::', res);
            this.recordatorios = (res.length === 0) ? [] : res;
            this.loadInit = false;
        }).catch(err => {
            this.loadInit = false;
            this.toastProvider.show("error", "No hemos cargado correcamente los recordatorios, intentalo otra vez.", "bottom");
        });
    }

    async getAllNotifications() {
        // console.log('getAllNotifications:::');
        await this.localNotifications.getIds().then(res => {
            console.log('getAllNotifications:::getIds:::res:::', res.length);
        }).catch(err => {
            console.log('getAllNotifications:::getIds:::err:::', err);
        });

        await this.localNotifications.getAll().then(res => {
            console.log('getAllNotifications:::getAll:::res:::', res);
        }).catch(err => {
            console.log('getAllNotifications:::getAll:::err:::', err);
        });

        await this.databaseProvider.getAllNotifications().then(res => {
            console.log('getAllNotifications:::res:::', res);
        }).catch(err => {
            console.log('getAllNotifications:::err:::', err);
        });

        await this.databaseProvider.getAllNotificationsRecordatorios().then(res => {
            console.log('getAllNotificationsRecordatorios:::res:::', res);
        }).catch(err => {
            console.log('getAllNotificationsRecordatorios:::err:::', err);
        });

        await this.databaseProvider.getAllNotificationsCitas().then(res => {
            console.log('getAllNotificationsCitas:::res:::', res);
        }).catch(err => {
            console.log('getAllNotificationsCitas:::err:::', err);
        });
    }

    async confirmar(slidingItem: ItemSliding, recordatorio: any) {
        let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Está seguro que desea confirmar la toma de este recordatorio?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => {
                        slidingItem.close();
                    }
                },
                {
                    text: 'Si, Confirmar',
                    handler: () => {
                        this.tomaRecordatorioTimes(recordatorio, 2, 'confirmo');
                        this.deleteRowItem(slidingItem, recordatorio);
                    }
                }
            ]
        });
        await alert.present();
    }

    async cancelar(slidingItem: ItemSliding, recordatorio: any) {
        let alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: '¿Está seguro que desea cancelar la toma de este recordatorio?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => {
                        slidingItem.close();
                    }
                },
                {
                    text: 'Si, Cancelar',
                    handler: () => {
                        this.tomaRecordatorioTimes(recordatorio, 0, 'cancelo');
                        this.deleteRowItem(slidingItem, recordatorio);
                    }
                }
            ]
        });
        await alert.present();
    }

    async tomaRecordatorioTimes(recordatorio: any, status: any, action: any) {
        const recordatorioId = recordatorio.id;
        let data_: any = {};
        data_.status = status;
        data_.id = recordatorioId;
        this.loadingProvider.show((status === 0 ? 'Cancelando' : 'Confirmando') + " toma...");
        await this.databaseProvider.tomaRecordatorioTimes(data_).then(() => {
            this.searchNotification('recordatorio', recordatorioId);
            this.toastProvider.show("success", "Se " + action + " la toma del recordatorio", 'bottom');
            this.loadingProvider.hide(0);
        }).catch(() => {
            this.toastProvider.show("error", "No se " + action + " la toma del recordatorio", 'bottom');
            this.loadingProvider.hide(0);
        });
    }

    async searchNotification(type: any, foreign_id: any) {
        await this.databaseProvider.searchNotification(type, foreign_id).then(res => {
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

    private deleteRowItem(slidingItem: ItemSliding, recordatorio: any) {
        let index = this.recordatorios.indexOf(recordatorio);
        if (index > -1) {
            this.recordatorios.splice(index, 1);
        }
        slidingItem.close();
    }

}
