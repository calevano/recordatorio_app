import { Component } from '@angular/core';
import { NavController, ItemSliding, AlertController } from 'ionic-angular';
// Pages
import { ProgresoDetallePage } from '../progreso-detalle/progreso-detalle';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
// Others
import moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-progreso',
    templateUrl: 'progreso.html',
})
export class ProgresoPage {

    progresoDetalle = ProgresoDetallePage;
    // segmento: number;
    loadInit = true;
    loadData = true;
    daySelected = '';
    progresos: any = [];
    daysCalendar: any = [];
    progressDefault: any;

    months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];

    monthsShort = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

    constructor(
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        public databaseProvider: DatabaseProvider,
        public loadingProvider: LoadingProvider,
        public toastProvider: ToastProvider,
    ) {
        // console.log('construct:::');
    }

    ionViewDidLoad() {
        // console.log('did Load');
    }

    ionViewWillEnter() {
        // console.log('dias:::', this.days);
        this.getAllProgreso();
    }

    ionViewDidLeave() {
        // console.log('ionViewDidLeave');
        this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    }

    getDayMonthYear() {
        this.daysCalendar = [];
        let dias = [];
        dias = this.days;
        // let diaMoment = moment().format('D');
        // let diaText = moment().format('ddd');
        let mes = moment().month();
        // let anio = moment().year();
        if (this.months[mes] !== 'Febrero' ||
            this.monthsShort[mes] !== 'Feb'
        ) {
            dias.push(29);
            dias.push(30);
        }

        if (this.months[mes] === 'Enero' ||
            this.months[mes] === 'Marzo' ||
            this.months[mes] === 'Mayo' ||
            this.months[mes] === 'Julio' ||
            this.months[mes] === 'Agosto' ||
            this.months[mes] === 'Octubre' ||
            this.months[mes] === 'Diciembre' ||
            this.monthsShort[mes] === 'Ene' ||
            this.monthsShort[mes] === 'Mar' ||
            this.monthsShort[mes] === 'May' ||
            this.monthsShort[mes] === 'Jul' ||
            this.monthsShort[mes] === 'Ago' ||
            this.monthsShort[mes] === 'Oct' ||
            this.monthsShort[mes] === 'Dic'
        ) {
            dias.push(31);
        }

        dias.forEach((dia) => {
            let fecha = moment().format('YYYY') + '-' + this.formatted_string('00', (mes + 1), 'l') + '-' + this.formatted_string('00', dia, 'l');
            this.daysCalendar.push(fecha);
        });

        // console.log('daysCalendar:::', this.daysCalendar);
        // console.log('day:::', Number(diaMoment));
        // console.log('day:::text:::', diaText);
        // console.log('months:::', mes);
        // console.log('year:::', anio);
        // console.log('months:::days:::', this.days);
        // console.log('fecha:::', moment().format('YYYY-MM-DD'));

        let fechaActual = moment().format('YYYY-MM-DD');
        this.selectProgressDay(fechaActual);
    }

    async getAllProgreso() {
        this.progresos = [];
        this.loadInit = true;
        await this.databaseProvider.getAllProgresoDays().then((res) => {
            // console.log('getAllProgreso:::res:::', res);
            this.progresos = (res.length === 0) ? [] : res;
            this.getDayMonthYear();
            // this.getProgressDay(this.progresos[0]);
            this.loadInit = false;
        }).catch((err) => {
            console.log('getAllProgreso:::err:::', err);
            this.toastProvider.show("error", "Porfavor intenta otra vez", "bottom");
        });
    }

    selectDay(event: any) {
        // console.log('selectDay:::event:::', event);
    }

    getProgressDay(progreso: any) {
        // console.log('progressSelectDay:::progreso:::', progreso);
        this.progressDefault = progreso;
    }

    selectProgressDay(dateActual: any) {
        this.daySelected = dateActual;

        this.daysCalendar.find((value: any, index: any) => {
            if (value === dateActual) {
                // console.log('index:::', index);
                // console.log('value:::', value);
                // this.segmento = index;
                // console.log('selectProgressDay:::slide_date_' + index);
                setTimeout(() => {
                    document.getElementById('slide_date_' + index).scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'center'
                    });
                });
            }
        });

        // console.log('progress:::', this.progresos);

        let progresoActual = this.progresos.filter((date: any) => date.day_duration === dateActual);
        // console.log('selectProgressDay:::progresoActual:::', progresoActual);

        if (progresoActual.length > 0) {
            // console.log('selectProgressDay:::progresoActual:::cero:::', progresoActual[0]);
            this.getProgressDay(progresoActual[0]);
            this.loadData = true;
        } else {
            this.progressDefault = {};
            this.loadData = false;
        }
    }


    async confirmar(slidingItem: ItemSliding, data: any) {
        // console.log('confirmar:::data:::', data);
        let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Está seguro que desea confirmar el progreso de la toma de este recordatorio?',
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
                        this.tomaRecordatorioTimes(data, 2, 'confirmo');
                        slidingItem.close();
                    }
                }
            ]
        });
        await alert.present();
    }

    async cancelar(slidingItem: ItemSliding, data: any) {
        // console.log('cancelar:::data:::', data);
        let alert = this.alertCtrl.create({
            title: 'Cancelar',
            message: '¿Está seguro que desea cancelar el progreso de la toma de este recordatorio?',
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
                        this.tomaRecordatorioTimes(data, 0, 'cancelo');
                        slidingItem.close();
                    }
                }
            ]
        });
        await alert.present();
    }

    async tomaRecordatorioTimes(data: any, status: any, action: any) {
        let index = this.progressDefault.data.indexOf(data);
        // console.log('index:::', index);
        let data_: any = {};
        data_.status = status;
        data_.id = data.id;
        this.loadingProvider.show((status === 0 ? 'Cancelando' : 'Confirmando') + " toma...");
        this.databaseProvider.tomaRecordatorioTimes(data_).then(() => {
            this.toastProvider.show("success", "Se " + action + " la toma del recordatorio", 'bottom');
            this.loadingProvider.hide(0);
            this.progressDefault.data[index].status = status;
        }).catch(() => {
            this.toastProvider.show("error", "No se " + action + " la toma del recordatorio", 'bottom');
            this.loadingProvider.hide(0);
        });
    }

    private formatted_string(pad: any, user_str: any, pad_pos: any) {
        if (typeof user_str === 'undefined')
            return pad;
        if (pad_pos == 'l') {
            return (pad + user_str).slice(-pad.length);
        }
        else {
            return (user_str + pad).substring(0, pad.length);
        }
    }

}
