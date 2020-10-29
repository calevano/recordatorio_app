import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Pages
// import { LoadingPage } from '../loading/loading';
// Providers
import { ToastProvider } from '../../providers/toast/toast';
import { DatabaseProvider } from '../../providers/database/database';
// import { EmailComposerProvider } from '../../providers/email-composer/email-composer';
import { StorageProvider } from '../../providers/storage/storage';

import { Subscription } from 'rxjs/Subscription';
// Plugins
// import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';

import * as papa from 'papaparse';
@Component({
  selector: 'page-informe',
  templateUrl: 'informe.html',
})
export class InformePage {

  connected: Subscription;
  disconnected: Subscription;

  informeForm: FormGroup;
  emailPattern = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,6}";

  dias: any = [];
  meses: any = [];
  anios: any = [];
  anioMes: any = [];
  csvData: any[] = [];
  headerRow: any[] = [];

  loadInit = true;

  user: any;

  constructor(
    public navCtrl: NavController,
    public toastProvider: ToastProvider,
    public databaseProvider: DatabaseProvider,
    public formBuilder: FormBuilder,
    // private network: Network,
    private file: File,
    private socialSharing: SocialSharing,
    // public emailComposerProvider: EmailComposerProvider,
    private storageProvider: StorageProvider
  ) {



    this.informeForm = this.formBuilder.group({
      anio: ['', Validators.compose([Validators.required])],
      mes: ['', Validators.compose([Validators.required])],
      // email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]
    });
  }

  ionViewDidLoad() {
    this.loadUser();
    // this.getDataInforme();
  }

  ionViewWillEnter() {
    this.getDataInforme();
    // this.preCarga();
  }

  ionViewDidEnter() {
    // this.connected = this.network.onConnect().subscribe(data => {
    //     this.displayNetworkUpdate(data.type);
    // }, error => console.error(error));

    // this.disconnected = this.network.onDisconnect().subscribe(data => {
    //     this.displayNetworkUpdate(data.type);
    // }, error => console.error(error));
  }

  ionViewWillLeave() {
    // this.connected.unsubscribe();
    // this.disconnected.unsubscribe();
  }

  async loadUser() {
    await this.storageProvider.getStorageLogin().then((response) => {
      // console.log('loadUser:::response:::', response);
      this.user = response;
    }).catch((err) => {
      console.log('loadUser:::err:::', err);
    });
  }

  async getDataInforme() {
    this.anioMes = [];
    this.anios = [];
    this.meses = [];
    // this.dias = [];
    this.loadInit = true;
    await this.databaseProvider.getDataInforme().then((response) => {
      // console.log("InformePage:::getDataInforme:::response:::", response);
      let response_ = response;
      if (response_.length === 0) {
        this.anioMes = [];
      } else {
        let anioMesFilter = [];
        for (let day of response_) {
          let durationSplit_ = day.day_duration.split('-');
          let anioMes_ = durationSplit_[0] + '-' + durationSplit_[1];
          anioMesFilter.push({ anioMes: anioMes_ });
        }
        const anioMes_ = Array.from(new Set(anioMesFilter.map(s => s.anioMes))).map(anioMes => {
          let resultAnioMes_ = anioMes.split('-');
          return {
            anioMes: anioMes,
            anio: resultAnioMes_[0],
            mes: resultAnioMes_[1]
          };
        });
        this.anioMes = anioMes_;
        // console.log('anioMes:::', this.anioMes);
        const anios_ = Array.from(new Set(anioMes_.map(s => s.anio))).map(anio => {
          return {
            anio: anio,
          };
        });
        this.anios = anios_;
        // console.log('anios:::', this.anios);
      }
      this.loadInit = false;
    }).catch((err) => {
      // console.log("InformePage:::getDataInforme:::err:::", JSON.stringify(err));
      this.toastProvider.show("error", "Porfavor intenta otra vez", "bottom");
    });
  }

  changeAnio(anio_: any) {
    let anioMes_ = this.anioMes;
    let meses_ = [];
    for (let i = 0; i < anioMes_.length; i++) {
      if (anioMes_[i].anio === anio_) {
        meses_.push({ mes: anioMes_[i].mes });
      }
    }
    this.meses = meses_;
    // console.log('meses:::', this.meses);
  }

  sendEmail() {
    // console.log('InformePage:::sendEmail:::', this.informeForm);
    if (!this.informeForm.valid) {
      this.toastProvider.show("dark", "Todos los campos son requeridos", 'bottom');
    } else {
      const headerRow = ['medicina', 'cantidad', 'nota', 'fecha', 'hora', 'estado'];

      let valores = this.informeForm.value;
      // console.log('InformePage:::value:::', this.informeForm.value);
      const anio = this.informeForm.value.anio;
      const mes = this.informeForm.value.mes;
      const mesTexto = this.selectMes(valores.mes);

      this.databaseProvider.getDataInformeMes(anio, mes).then((response) => {
        // console.log("InformePage:::getDataInformeMes:::response:::", response);
        let csv = papa.unparse({
          fields: headerRow,
          data: response
        });
        // console.log('csv:::', csv);
        const tituloInforme = this.strSlug(this.user, '-') + '-informe-mes-' + mesTexto.toLowerCase() + '.csv';
        this.file.writeFile(this.file.dataDirectory, tituloInforme, csv, { replace: true }).then((res) => {
          // console.log('writeFile response');
          const subject = 'Reporte mes "' + mesTexto + '" año ' + valores.anio;
          const body = 'Buen día, adjunto un archivo el cual está el progreso de las medicinas.';
          this.socialSharing.share(body, subject, res.nativeURL, null);
        }).catch((err) => {
          console.log('writeFile err');
        });
      }).catch((err) => {
        console.log("InformePage:::getDataInformeMes:::err:::", JSON.stringify(err));
      });

      // this.emailComposerProvider.create(this.informeForm.value.email, data);
      // this.navCtrl.setRoot(LoadingPage, {
      //     message: 'Estamos preparando todo para enviar el informe al correo ',
      //     reference: 'informe',
      //     parameters: {
      //         email: this.informeForm.value.email
      //     }
      // });
    }
  }

  private strSlug(text: any, type: any) {
    let tipo = type || '-';
    let str = text.replace(/^\s+|\s+$/g, '').toLowerCase();
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, tipo).replace(/-+/g, tipo);
    return str;
  }

  private selectMes(mesNumber: any) {
    let valueInt = parseInt(mesNumber);
    let arrayMes = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Setiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return arrayMes[valueInt - 1];
  }

  // displayNetworkUpdate(connectionState: string) {
  //     if (connectionState === "online") {
  //         this.toastProvider.show("success", "Usted esta conectado", 'bottom');
  //     } else {
  //         this.toastProvider.show("error", "Usted esta desconectado", 'bottom');
  //     }
  // }

}
