import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingProvider: LoadingProvider,
        public databaseProvider: DatabaseProvider,
        public toastProvider: ToastProvider,
    ) {
        this.cita = navParams.get('cita');
        console.log("thisCita:::", this.cita);
        this.date = moment(this.cita.day).format('YYYY-MM-DD');
        this.data.fecha = this.date;
        console.log("thisCita:::", this.date);
        this.hour = moment(this.cita.hour, "HH:mm").format('HH:mm');
        this.data.hora = this.hour;
        console.log("thisCita:::", this.hour);
        console.log("this.data.hora:::", this.data.hora);
        this.data.pregunta = this.cita.question;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoCitaEditarPage');
    }

    editCita() {
        if (this.data.fecha === "" ||
            this.data.hora === "" ||
            this.data.pregunta === "") {
            console.log("vacio");
            this.toastProvider.show("error", "Necesita completar todos los campos...", 'bottom');
        } else {
            this.loadingProvider.show("Editando cita...");
            let cita_: any = [];
            cita_['day'] = this.data.fecha;
            cita_['hour'] = this.data.hora;
            cita_['question'] = this.data.pregunta;
            cita_['doctor_id'] = this.cita.doctor_id;

            console.log("cita:::", cita_);

            this.databaseProvider.updateCita(cita_).then((res) => {
                console.log("editCita:::res:::", res);
                this.toastProvider.show("success", "Se edito la cita correctamente", 'bottom');
                this.loadingProvider.hide(0);
                this.navCtrl.pop();
            }).catch((err) => {
                console.log("editCita:::err:::", err);
                this.toastProvider.show("error", "No se pudo editar. favor de intentarlo de nuevo", 'bottom');
                this.loadingProvider.hide(0);
            });
        }
    }

}
