import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import * as moment from 'moment';
import "moment/locale/es";
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-modal-duracion-fecha',
  templateUrl: 'modal-duracion-fecha.html',
})
export class ModalDuracionFechaPage {

  dateOnly: any;
  dateInit: any;
  dateEnd: any;

  data: any = {
    only: '',
    inicio: '',
    final: '',
    opcionDia: '0'
  };

  // mesCorto = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  showOnlyDate: boolean = true;
  showSelectDate: boolean = false;
  isVerifySave: boolean = false;

  aniosMaximos: any[] = [];
  maxAnio: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastProvider: ToastProvider,
  ) {
    // console.log('ModalDuracionFechaPage:::constructor');
    let duracion_ = navParams.get('duracion');
    console.log(moment().format('YYYY-MM-DD'));
    // console.log('ModalDuracionFechaPage:::constructor:::', duracion_);
    if (typeof duracion_ !== "undefined") {
      if (duracion_.opcion === 0) {
        this.data.opcionDia = '0';
        this.showOnlyDate = true;
        this.showSelectDate = false;
        this.dateOnly = moment().format('YYYY-MM-DD');
        this.data.only = duracion_.only;
        this.isVerifySave = true;
      } else {
        this.data.opcionDia = '1';
        this.showOnlyDate = false;
        this.showSelectDate = true;
        this.dateInit = moment().format('YYYY-MM-DD');
        this.dateEnd = moment().add(1, 'days').format('YYYY-MM-DD');
        this.data.inicio = duracion_.inicio;
        this.data.final = duracion_.final;
      }
    } else {
      this.dateOnly = moment().format('YYYY-MM-DD');
      this.data.only = this.dateOnly;
      this.isVerifySave = true;
    }
    let anioMax = Number(moment().format('YYYY'));

    this.aniosMaximos.push(anioMax + 1);
    this.aniosMaximos.push(anioMax);
    this.maxAnio = (anioMax + 1).toString() + '-12-31';

    console.log('maxAnio:::', this.maxAnio);
    console.log('aniosMaximos:::', this.aniosMaximos);
    // console.log('un anio mas', moment().add(1, 'years').format('YYYY'));
  }

  ionViewDidLoad() {
    // console.log('ModalDuracionFechaPage:::ionViewDidLoad');
  }

  selectOptionDay(option_: number) {
    if (option_ === 0) {
      this.showOnlyDate = true;
      this.showSelectDate = false;

      this.dateOnly = moment().format('YYYY-MM-DD');
      this.data.only = this.dateOnly;

      this.data.inicio = "";
      this.data.final = "";
      this.isVerifySave = true;
    } else {
      this.showOnlyDate = false;
      this.showSelectDate = true;

      this.dateInit = moment().format('YYYY-MM-DD');
      this.dateEnd = moment().add(1, 'days').format('YYYY-MM-DD');

      this.data.only = "";
      this.data.inicio = this.dateInit;
      this.data.final = this.dateEnd;
    }
  }

  // changeDateInit(ev: any) {
  //     let month_ = this.numberPad(ev.month, 2);
  //     let date_ = ev.year + '-' + month_ + '-' + ev.day;
  //     let init_ = moment(date_, "YYYY-MM-DD");
  //     let end_ = moment(this.dateEnd, "YYYY-MM-DD");
  //     let diff_ = init_.diff(end_, "days");
  //     if (diff_ === 0) {
  //         this.toastProvider.show("error", "La fecha inicio no puede ser igual a la fecha final de la toma", 'bottom');
  //         this.isVerifySave = false;
  //     } else if (diff_ > 0) {
  //         this.toastProvider.show("error", "La fecha inicio no puede ser mayor a la fecha final de la toma", 'bottom');
  //         this.isVerifySave = false;
  //     }
  //     else {
  //         this.isVerifySave = true;
  //     }
  // }

  // changeDateFinal(ev: any) {
  //     let month_ = this.numberPad(ev.month, 2);
  //     let date_ = ev.year + '-' + month_ + '-' + ev.day;
  //     let end_ = moment(date_, "YYYY-MM-DD");
  //     let init_ = moment(this.dateEnd, "YYYY-MM-DD");
  //     let diff_ = init_.diff(end_, "days");
  //     if (diff_ === 0) {
  //         this.toastProvider.show("error", "La fecha inicio no puede ser igual a la fecha final de la toma", 'bottom');
  //         this.isVerifySave = false;
  //     } else if (diff_ > 0) {
  //         this.toastProvider.show("error", "La fecha inicio no puede ser mayor a la fecha final de la toma", 'bottom');
  //         this.isVerifySave = false;
  //     }
  //     else {
  //         this.isVerifySave = true;
  //     }
  // }

  numberPad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  selectOpcion() {
    // console.log('ModalDuracionFechaPage:::selectOpcion');
    let messageDays = '';
    let data: Object = {};
    if (this.data.opcionDia === '0') {
      data = { 'opcion': 0, 'only': this.data.only };
    } else {
      let init_ = moment(this.data.inicio, "YYYY-MM-DD");
      let end_ = moment(this.data.final, "YYYY-MM-DD");
      let diff_ = init_.diff(end_, "days");
      if (diff_ >= 0) {
        messageDays = "La fecha inicio no puede ser igual o mayor que la fecha final de la toma.";
        // this.toastProvider.show("error", "La fecha inicio no puede ser igual a la fecha final de la toma", 'bottom');
        this.isVerifySave = false;
      }
      else {
        this.isVerifySave = true;
        data = { 'opcion': 1, 'inicio': this.data.inicio, 'final': this.data.final };
      }
    }
    if (this.isVerifySave) {
      this.viewCtrl.dismiss(data);
    } else {
      this.toastProvider.show("error", messageDays, 'bottom');
    }

  }

  dismiss() {
    // console.log('ModalDuracionFechaPage:::dismiss');
    this.viewCtrl.dismiss();
  }

}
