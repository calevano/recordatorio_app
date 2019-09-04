import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// Modals
import { ModalConsejoTomaPage } from '../modal-consejo-toma/modal-consejo-toma';
import { ModalDuracionFechaPage } from '../modal-duracion-fecha/modal-duracion-fecha';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
// Plugins
import { WheelSelector } from '@ionic-native/wheel-selector';
// Others
import moment from 'moment';
import "moment/locale/es";

@Component({
    selector: 'page-hoy-medicamento-crear',
    templateUrl: 'hoy-medicamento-crear.html',
})
export class HoyMedicamentoCrearPage {

    recordatorioForm: FormGroup;

    medicamento: any;
    noteText: string = "";

    dayDurationType: number;
    dayDurationText: string = "";

    fechaInicio: string = "";
    fechaFinal: string = "";

    jsonData: any = {
        numbers: [
            { quantity: "1" },
            { quantity: "2" },
            { quantity: "3" },
            { quantity: "4" },
            { quantity: "5" },
            { quantity: "6" },
            { quantity: "7" },
            { quantity: "8" },
            { quantity: "9" },
            { quantity: "10" }
        ]
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public toastProvider: ToastProvider,
        public loadingProvider: LoadingProvider,
        public formBuilder: FormBuilder,
        public databaseProvider: DatabaseProvider,
        private selector: WheelSelector,
    ) {
        this.medicamento = navParams.get('medicamento');
        console.log("medicamento:::", this.medicamento);

        this.recordatorioForm = this.formBuilder.group({
            medicine_id: [this.medicamento.id, Validators.required],
            day_duration: ['', Validators.required],
            note: ['', Validators.required],
            horarios: this.formBuilder.array([
                this.initFields()
            ])
        });
    }

    ionViewDidLoad() {
        console.log('HoyMedicamentoCrearPage:::ionViewDidLoad');
    }

    initFields(): FormGroup {
        return this.formBuilder.group({
            hour: ['', Validators.required],
            quantity: ['', Validators.required],
        });
    }

    addControlForm() {
        const control = <FormArray>this.recordatorioForm.controls.horarios;
        control.push(this.initFields());
    }

    removeInputField(i: number): void {
        const control = <FormArray>this.recordatorioForm.controls.horarios;
        control.removeAt(i);
    }

    modalConsejo() {
        let consejoTomaModal = this.modalCtrl.create(ModalConsejoTomaPage, { consejoToma: this.noteText });
        consejoTomaModal.onDidDismiss(data => {
            if (typeof data !== "undefined") {
                this.recordatorioForm.controls.note.setValue(data.consejoToma);
                console.log("RecordatorioForm:::UPDATE:::3:::", this.recordatorioForm);
                this.noteText = data.consejoToma;
            }
        });
        consejoTomaModal.present();
    }

    openPastillas(i: any) {
        console.log("i:::", i);
        let setValue_ = this.recordatorioForm.controls.horarios.value[i].quantity;
        console.log("setValue_:::", setValue_);
        let config_ = {
            title: "Cantidad de pastilla(s) a tomar",
            items: [this.jsonData.numbers],
            positiveButtonText: "Elegir",
            negativeButtonText: "Cancelar",
            displayKey: 'quantity',
        };

        if (setValue_ !== "") {
            config_['defaultItems'] = [
                {
                    index: 0,
                    value: setValue_
                }
            ];
        }
        console.log("config_:::", config_);

        this.selector.show(config_).then(result => {
            // this.dataQuantity = result[0].quantity;
            const horarioControl = (<FormArray>this.recordatorioForm.controls['horarios']);
            this.recordatorioForm.value.horarios[i]['quantity'] = result[0].quantity;
            <FormControl>horarioControl.controls[i]['controls']['quantity'].setValue(result[0].quantity);
            console.log("RecordatorioForm:::UPDATE:::3:::", this.recordatorioForm.controls.horarios);
        }).catch((err) => {
            console.log('openPastillas:::err:::', err);
        });

    }

    modalDuracion() {
        let dataSend_: any;
        if (typeof this.dayDurationType !== "undefined") {
            dataSend_ = {
                duracion: {}
            };
            if (this.dayDurationType === 0) {
                dataSend_.duracion['opcion'] = this.dayDurationType;
                dataSend_.duracion['only'] = this.fechaFinal;
            } else {
                dataSend_.duracion['opcion'] = this.dayDurationType;
                dataSend_.duracion['inicio'] = this.fechaInicio;
                dataSend_.duracion['final'] = this.fechaFinal;
            }
        }

        let duracionFecha = this.modalCtrl.create(ModalDuracionFechaPage, dataSend_);
        duracionFecha.onDidDismiss(data => {
            if (typeof data !== "undefined") {
                if (data.opcion === 0) {
                    this.dayDurationType = data.opcion;
                    this.dayDurationText = "Solo el " + data.only;
                    this.fechaInicio = "";
                    this.fechaFinal = data.only;
                    this.recordatorioForm.controls.day_duration.setValue(data.only);
                } else {
                    this.dayDurationType = data.opcion;
                    this.dayDurationText = "Desde el " + data.inicio + " Hasta el " + data.final;
                    this.fechaInicio = data.inicio;
                    this.fechaFinal = data.final;
                    this.recordatorioForm.controls.day_duration.setValue(data.final);
                }
            }
        });
        duracionFecha.present();
    }

    async saveRecordatorio() {
        console.log('HoyMedicamentoCrearPage:::saveRecordatorio');
        if (!this.recordatorioForm.valid) {
            console.log("no es valido");
        } else {
            this.loadingProvider.show("Creando recordatorio, espera un momento...");
            console.log("data_:::", this.recordatorioForm.value);
            let recordatorioForm_ = this.recordatorioForm.value;
            let recordatorio_: any = {
                medicine_id: recordatorioForm_.medicine_id,
                note: recordatorioForm_.note
            };
            let horariosArray_: any = [];
            console.log("recordatorio_:::", recordatorio_);
            if (this.fechaInicio === "") {

                for (let i = 0; i < recordatorioForm_.horarios.length; i++) {
                    horariosArray_.push(
                        {
                            hour: recordatorioForm_.horarios[i].hour,
                            quantity: recordatorioForm_.horarios[i].quantity,
                            status: 1,
                            day_duration: recordatorioForm_.day_duration,
                        }
                    );
                }
                console.log("recordatorioForm_:::horariosArray_:::", horariosArray_);
            } else {
                // let arrayDias: any = [];
                let init_ = moment(this.fechaInicio, "YYYY-MM-DD");
                let end_ = moment(this.fechaFinal, "YYYY-MM-DD");

                for (let i = 0; i < recordatorioForm_.horarios.length; i++) {
                    horariosArray_.push(
                        {
                            hour: recordatorioForm_.horarios[i].hour,
                            quantity: recordatorioForm_.horarios[i].quantity,
                            status: 1,
                            day_duration: this.fechaInicio,
                        }
                    );
                }
                let diff_ = end_.diff(init_, "days");
                let cantidadDias: number = diff_;
                console.log("HoyMedicamentoCrearPage:::modalDuracion:::cantidadDias:::" + cantidadDias + ' dias de diferencia');

                for (let k = 0; k < cantidadDias; k++) {
                    for (let j = 0; j < recordatorioForm_.horarios.length; j++) {
                        horariosArray_.push(
                            {
                                hour: recordatorioForm_.horarios[j].hour,
                                quantity: recordatorioForm_.horarios[j].quantity,
                                status: 1,
                                day_duration: moment(this.fechaInicio).add((k + 1), 'days').format('YYYY-MM-DD'),
                            }
                        );
                    }
                }
                console.log('HoyMedicamentoCrearPage:::modalDuracion:::arrayDias:::', horariosArray_);
            }
            await this.databaseProvider.insertRecordatorio(recordatorio_).then((response) => {
                this.toastProvider.show("success", "Se agrego el recordatorio", 'bottom');
                this.saveRecordatorioTimes(response.insertId, horariosArray_);
                this.loadingProvider.hide(0);
            }).catch((err) => {
                this.toastProvider.show("error", "No se pudo agregar. favor de intentarlo de nuevo", 'bottom');
            });
        }
    }

    async saveRecordatorioTimes(id: number, horarios: any) {
        for (let horario of horarios) {
            await this.databaseProvider.insertRecordatorioTimes(horario, id).then((response) => {

            }).catch((err) => {
                this.toastProvider.show("error", "No se pudo obtener el recordatorio agregado", 'bottom');
            });
        }
        this.navCtrl.popToRoot();
        // this.app.getRootNav().setRoot(PortadaPage);
    }
}
