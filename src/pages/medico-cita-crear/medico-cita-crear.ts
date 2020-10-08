import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Providers
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';
import { LocalNotificationProvider } from '../../providers/local-notification/local-notification';
// Others
import moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-medico-cita-crear',
    templateUrl: 'medico-cita-crear.html',
})
export class MedicoCitaCrearPage {

    hourDefault = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    minuteDefault = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

    data: any = {
        fecha: '',
        hora: '',
        pregunta: ''
    };
    date: any;
    medico: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingProvider: LoadingProvider,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
        public localNotificationProvider: LocalNotificationProvider
    ) {
        this.medico = navParams.get('medico');
        let horarioActual = moment();
        let minute = Number(horarioActual.format('mm'));
        this.date = horarioActual.format('YYYY-MM-DD');
        this.data.fecha = this.date;
        this.data.hora = horarioActual.format('HH') + ':' + (Math.ceil(minute / 5) * 5);

    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad MedicoCitaCrearPage');
    }

    async saveCita() {
        if (this.data.fecha === "" ||
            this.data.hora === "" ||
            this.data.pregunta === ""
        ) {
            this.toastProvider.show('error', 'Necesita completar todos los campos.', 'bottom');
        } else {
            this.loadingProvider.show("Guardando cita");
            let cita_: any = {};
            cita_.day = this.data.fecha;
            cita_.hour = this.data.hora;
            cita_.question = this.data.pregunta;
            cita_.doctor_id = this.medico.id;

            // console.log("saveCita:::cita:::", cita_);

            await this.databaseProvider.insertCita(cita_).then(response => {
                // console.log("saveCita:::res:::", response);
                this.insertNotifications('cita', cita_, response.insertId);
                this.toastProvider.show("success", "Se agrego la cita correctamente.", 'bottom');
                this.loadingProvider.hide(0);
                this.navCtrl.pop();
                // let data_: any = {};
                // const tipoMedico = (this.medico.prefix === 'dr' ? 'el Dr. ' : 'la Dra. ');
                // this.databaseProvider.insertNotifications('cita', response.insertId).then(res => {
                //     console.log('saveCita:::insertNotifications:::res:::', res);

                //     data_.id = res.insertId;
                //     data_.dateHour = cita_.day + ' ' + cita_.hour;
                //     data_.title = 'Cita con ' + tipoMedico + this.medico.names;
                //     data_.text = cita_.question;
                //     data_.group = 'cita';

                //     console.log('saveCita:::insertNotifications:::data[' + response.insertId + ']:::', data_);
                //     this.loadingProvider.hide(0);
                //     this.navCtrl.pop();
                //     // this.localNotificationProvider.create(data_);
                // }).catch(error => {
                //     console.log('saveCita:::insertNotifications:::err:::', error);
                // });

            }).catch(err => {
                console.log("saveCita:::err:::", err);
                this.toastProvider.show("error", "No se pudo agregar. favor de intentarlo de nuevo.", 'bottom');
                this.loadingProvider.hide(0);
            });
        }
    }

    async insertNotifications(type: any, cita_: any, idCita: any) {
        await this.databaseProvider.insertNotifications(type, idCita).then(res => {
            // console.log('insertNotifications:::res:::', res);
            let data_: any = {};
            const tipoMedico = (this.medico.prefix === 'dr' ? 'el Dr. ' : 'la Dra. ');
            data_.id = res.insertId;
            data_.dateHour = cita_.day + ' ' + cita_.hour;
            data_.title = 'Cita con ' + tipoMedico + this.medico.names;
            data_.text = cita_.question;
            data_.group = 'cita';
            // console.log('insertNotifications:::', data_);
            this.localNotificationProvider.create(data_);
        }).catch(err => {
            console.log('insertNotifications:::err:::', err);
        });
    }

}
