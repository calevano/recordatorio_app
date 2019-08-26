import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { ModalConsejoTomaPage } from '../modal-consejo-toma/modal-consejo-toma';
import { ModalDuracionFechaPage } from '../modal-duracion-fecha/modal-duracion-fecha';

import { WheelSelector } from '@ionic-native/wheel-selector';

import moment from 'moment';
import "moment/locale/es";


@Component({
    selector: 'page-hoy-medicamento-crear',
    templateUrl: 'hoy-medicamento-crear.html',
})
export class HoyMedicamentoCrearPage {

    medicamento: any;
    note: string = "";
    day_duration: string = "";
    dayDurationType: number;
    dayDurationText: string = "";

    dataInicio: string = "";
    dataFinal: string = "";

    recordatorioForm: FormGroup;

    dataQuantity: any = "";
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
        public formBuilder: FormBuilder,
        private selector: WheelSelector
    ) {
        this.medicamento = navParams.get('medicamento');
        console.log("medicamento:::", this.medicamento);

        this.recordatorioForm = this.formBuilder.group({
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
        // this.recordatorioForm.addControl('hour' + this.playerCount, new FormControl('', Validators.required));
        // this.recordatorioForm.addControl('quantity' + this.playerCount, new FormControl('', Validators.required));
    }

    removeInputField(i: number): void {
        const control = <FormArray>this.recordatorioForm.controls.horarios;
        control.removeAt(i);
    }

    modalConsejo() {
        let consejoTomaModal = this.modalCtrl.create(ModalConsejoTomaPage, { consejoToma: this.note });
        consejoTomaModal.onDidDismiss(data => {
            if (typeof data !== "undefined") {
                this.note = data.consejoToma;
            }
        });
        consejoTomaModal.present();
    }

    openPastillas(i: any) {
        console.log("i:::", i);
        console.log("openPastillas:::this.jsonData:::", this.jsonData);
        this.selector.show({
            title: "Cantidad de pastilla(s) a tomar",
            items: [
                this.jsonData.numbers
            ],
            positiveButtonText: "Elegir",
            negativeButtonText: "Cancelar",
            displayKey: 'quantity',
        }).then(result => {
            // console.log(result[0].description + ' at index: ' + result[0].index);
            console.log("openPastillas:::result:::", result);
            this.dataQuantity = result[0].quantity;
            console.log("valor:::RecordatorioForm:::value:::", this.recordatorioForm.value);
            console.log("valor:::RecordatorioForm:::value:::horarios:::[" + i + "]:::", this.recordatorioForm.value.horarios[i]);
            // this.recordatorioForm.value.horarios[i].quantity = result[0].quantity;
            // this.recordatorioForm.controls.horarios[i].quantity.setValue(result[0].quantity);
            console.log("RecordatorioForm:::", this.recordatorioForm);
            console.log("RecordatorioForm:::controls:::", this.recordatorioForm.controls);
            console.log("RecordatorioForm:::controls:::horarios:::", this.recordatorioForm.controls.horarios);
            const horarioControl = (<FormArray>this.recordatorioForm.controls['horarios']);
            // <FormControl>indice['quantity'].patchValue(result[0].quantity);
            // horarioControl.controls[i]['controls']['quantity'] = result[0].quantity;
            // console.log("RecordatorioForm:::UPDATE:::1:::", this.recordatorioForm);
            this.recordatorioForm.value.horarios[i]['quantity'] = result[0].quantity;
            console.log("RecordatorioForm:::UPDATE:::2:::", this.recordatorioForm);

            <FormControl>horarioControl.controls[i]['controls']['quantity'].setValue(result[0].quantity);
            console.log("RecordatorioForm:::UPDATE:::3:::", this.recordatorioForm.controls.horarios);
        }).catch((err) => {
            console.log('openPastillas:::err:::', err);
        });

    }

    modalDuracion() {
        console.log('HoyMedicamentoCrearPage:::modalDuracion');
        console.log("dayDurationType:::", this.dayDurationType);

        let dataSend_ = {};
        if (typeof this.dayDurationType !== "undefined") {
            if (this.dayDurationType === 0) {
                dataSend_ = {
                    duracion: {
                        opcion: this.dayDurationType,
                        only: this.day_duration
                    }
                };
            } else {
                dataSend_ = {
                    duracion: {
                        opcion: this.dayDurationType,
                        inicio: this.dataInicio,
                        final: this.day_duration
                    }
                };
            }
        }

        let duracionFecha = this.modalCtrl.create(ModalDuracionFechaPage, dataSend_);
        duracionFecha.onDidDismiss(data => {
            if (typeof data !== "undefined") {
                console.log("HoyMedicamentoCrearPage:::modalDuracion:::data:::", data);
                if (data.opcion === 0) {
                    this.dayDurationType = data.opcion;
                    this.dayDurationText = "Solo el " + data.only;
                    this.day_duration = data.only;
                } else {
                    this.dayDurationType = data.opcion;
                    this.dayDurationText = "Desde el " + data.inicio + " Hasta el " + data.final;
                    this.dataInicio = data.inicio;
                    this.day_duration = data.final;
                    let arrayDias: Array<string> = [];

                    let init_ = moment(data.inicio, "YYYY-MM-DD");
                    let end_ = moment(data.final, "YYYY-MM-DD");
                    let diff_ = end_.diff(init_, "days");

                    let cantidadDias: number = diff_;

                    for (let i = 0; i < cantidadDias; i++) {
                        arrayDias[i] = moment().add((i + 1), 'days').format('YYYY-MM-DD');
                    }
                    arrayDias.unshift(data.inicio);
                    console.log('HoyMedicamentoCrearPage:::modalDuracion:::arrayDias:::', arrayDias);
                    console.log("HoyMedicamentoCrearPage:::modalDuracion:::cantidadDias:::" + arrayDias.length + ' dias de diferencia');
                }
            }
        });
        duracionFecha.present();
    }

    saveRecordatorio() {
        console.log('HoyMedicamentoCrearPage:::saveRecordatorio');
        if (!this.recordatorioForm.valid) {
            console.log("no es valido");
        } else {
            console.log("data_:::", this.recordatorioForm.value);
        }
    }

}
