import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';
import { LocalNotificationProvider } from '../../providers/local-notification/local-notification';

import moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-medico-cita-editar',
    templateUrl: 'medico-cita-editar.html',
})
export class MedicoCitaEditarPage {

    data: any = {
        fecha: '',
        hora: '',
        pregunta: ''
    };
    date: any;
    hour: any;
    cita: any;
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
        // console.log('medico:::', this.medico);
        this.cita = navParams.get('cita');
        this.date = moment(this.cita.day).format('YYYY-MM-DD');
        this.data.fecha = this.date;
        this.hour = moment(this.cita.hour, "HH:mm").format('HH:mm');
        this.data.hora = this.hour;
        this.data.pregunta = this.cita.question;
    }

    ionViewDidLoad() {
        // console.log('MedicoCitaEditarPage ionViewDidLoad');
    }

    editCita() {
        if (this.data.fecha === "" ||
            this.data.hora === "" ||
            this.data.pregunta === "") {
            this.toastProvider.show("error", "Necesita completar todos los campos.", 'bottom');
        } else {
            this.loadingProvider.show("Editando cita");
            let cita_: any = {};
            cita_.id = this.cita.id;
            cita_.day = this.data.fecha;
            cita_.hour = this.data.hora;
            cita_.question = this.data.pregunta;
            cita_.doctor_id = this.cita.doctor_id;

            // console.log("editCita:::cita:::", cita_);

            this.databaseProvider.updateCita(cita_).then(response => {
                // console.log("MedicoCitaEditarPage:::editCita:::response:::", response);
                this.searchNotification('cita', cita_);
                this.toastProvider.show("success", "Se edito la cita correctamente", 'bottom');
                this.loadingProvider.hide(0);
                this.navCtrl.pop();
            }).catch(err => {
                console.log("MedicoCitaEditarPage::::editCita:::err:::", err);
                this.toastProvider.show("error", "No se pudo editar. favor de intentarlo de nuevo", 'bottom');
                this.loadingProvider.hide(0);
            });
        }
    }

    async searchNotification(type: any, cita: any) {
        await this.databaseProvider.searchNotification(type, cita.id).then(res => {
            // console.log('searchNotification:::res:::', res[0]);
            if (res.length === 1) {
                this.updateNotification(cita, res[0]);
            }
        }).catch(err => {
            console.log('searchNotification:::err:::', err);
        });
    }

    async updateNotification(cita_: any, idNotify: any) {
        let data_: any = {};
        const tipoMedico = (this.medico.prefix === 'dr' ? 'el Dr. ' : 'la Dra. ');
        data_.id = idNotify.id;
        data_.dateHour = cita_.day + ' ' + cita_.hour;
        data_.title = 'Cita con ' + tipoMedico + this.medico.names;
        data_.text = cita_.question;
        data_.group = 'cita';
        // console.log('updateNotification:::', data_);
        await this.localNotificationProvider.update(data_);
    }

}
