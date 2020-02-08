import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
    selector: 'page-progreso-detalle',
    templateUrl: 'progreso-detalle.html',
})
export class ProgresoDetallePage {

    recordatorio: any = {};

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
    ) {
        // console.log('HoyDetallePage:::constructor');
        this.recordatorio = navParams.get('recordatorio');
        // console.log('HoyDetallePage:::constructor:::recordatorio:::', this.recordatorio);
    }

    ionViewDidLoad() {
        // console.log('ProgresoDetallePage:::ionViewDidLoad');
    }

    async cancelar() {
        let alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: '¿Está seguro que desea cancelar el progreso de la toma de este recordatorio?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Si, Cancelar',
                    handler: () => {
                        let data_: any = {};
                        data_['status'] = 0;
                        data_['id'] = this.recordatorio.id;
                        this.loadingProvider.show("Cancelando toma...");
                        this.databaseProvider.tomaRecordatorioTimes(data_).then((response) => {
                            this.toastProvider.show("success", "Se cancelo la toma del recordatorio", 'bottom');
                            this.loadingProvider.hide(0);
                            this.navCtrl.pop();
                        }).catch((err) => {
                            this.toastProvider.show("error", "No se pudo cancelar la toma del recordatorio", 'bottom');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmar() {
        let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Está seguro que desea confirmar el progreso de la toma de este recordatorio?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: 'Si, Confirmar',
                    handler: () => {
                        let data_: any = {};
                        data_['status'] = 2;
                        data_['id'] = this.recordatorio.id;
                        this.loadingProvider.show("Confirmando toma...");
                        this.databaseProvider.tomaRecordatorioTimes(data_).then((response) => {
                            this.toastProvider.show("success", "Se confirmo la toma del recordatorio", 'bottom');
                            this.loadingProvider.hide(0);
                            this.navCtrl.pop();
                        }).catch((err) => {
                            this.toastProvider.show("error", "No se pudo confirmar la toma del recordatorio", 'bottom');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

}
