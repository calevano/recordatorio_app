import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Providers
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';
// Others
import moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-medico-cita-crear',
    templateUrl: 'medico-cita-crear.html',
})
export class MedicoCitaCrearPage {

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
    ) {
        this.medico = navParams.get('medico');
        this.date = moment().format('YYYY-MM-DD');
        this.data.fecha = this.date;
        // this.data.hora = moment().format('HH:mm');
        console.log("this.data.hora:::", this.data.hora);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicoCitaCrearPage');
    }

    saveCita() {
        if (this.data.fecha === "" ||
            this.data.hora === "" ||
            this.data.pregunta === "") {
            this.toastProvider.show('error', 'Necesita completar todos los campos.', 'bottom');
        } else {
            this.loadingProvider.show("Agregando cita");
            let cita_: any = {};
            cita_['day'] = this.data.fecha;
            cita_['hour'] = this.data.hora;
            cita_['question'] = this.data.pregunta;
            cita_['doctor_id'] = this.medico.id;

            console.log("saveCita:::cita:::", cita_);

            this.databaseProvider.insertCita(cita_).then((res) => {
                console.log("saveCita:::res:::", res);
                this.toastProvider.show("success", "Se agrego la cita correctamente.", 'bottom');
                this.loadingProvider.hide(0);
                this.navCtrl.pop();
            }).catch((err) => {
                console.log("saveCita:::err:::", err);
                this.toastProvider.show("error", "No se pudo agregar. favor de intentarlo de nuevo.", 'bottom');
                this.loadingProvider.hide(0);
            });
        }
    }

}
