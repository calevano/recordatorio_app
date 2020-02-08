import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Pages
import { HoyMedicamentoPage } from '../hoy-medicamento/hoy-medicamento';
import { HoyDetallePage } from '../hoy-detalle/hoy-detalle';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';
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
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
        public localNotifications: LocalNotifications
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
            this.recordatorios = (res.length === 0) ? [] : res;
            this.loadInit = false;
        }).catch(err => {
            this.loadInit = false;
            this.toastProvider.show("error", "No hemos cargado correcamente los recordatorios, intentalo otra vez.", "bottom");
        });
    }

    // async getAllNotifications() {
    //     console.log('getAllNotifications:::');
    //     await this.localNotifications.getIds().then(res => {
    //         console.log('getAllNotifications:::getIds:::res:::', res.length);
    //     }).catch(err => {
    //         console.log('getAllNotifications:::getIds:::err:::', err);
    //     });

    //     await this.localNotifications.getAll().then(res => {
    //         console.log('getAllNotifications:::getAll:::res:::', res);
    //     }).catch(err => {
    //         console.log('getAllNotifications:::getAll:::err:::', err);
    //     });

    //     await this.databaseProvider.getAllNotifications().then(res => {
    //         console.log('getAllNotifications:::res:::', res);
    //     }).catch(err => {
    //         console.log('getAllNotifications:::err:::', err);
    //     });

    //     await this.databaseProvider.getAllNotificationsRecordatorios().then(res => {
    //         console.log('getAllNotificationsRecordatorios:::res:::', res);
    //     }).catch(err => {
    //         console.log('getAllNotificationsRecordatorios:::err:::', err);
    //     });

    //     await this.databaseProvider.getAllNotificationsCitas().then(res => {
    //         console.log('getAllNotificationsCitas:::res:::', res);
    //     }).catch(err => {
    //         console.log('getAllNotificationsCitas:::err:::', err);
    //     });
    // }

}
