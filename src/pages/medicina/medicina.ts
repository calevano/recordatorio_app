import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
// Pages
// import { MedicinaDetallePage } from '../medicina-detalle/medicina-detalle';
import { MedicinaCrearPage } from '../medicina-crear/medicina-crear';
import { MedicinaEditarPage } from '../medicina-editar/medicina-editar';
// Providers
import { DatabaseProvider } from '../../providers/database/database';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
	selector: 'page-medicina',
	templateUrl: 'medicina.html',
})
export class MedicinaPage {

	// medicinaDetalle = MedicinaDetallePage;
	// medicinaCrear = MedicinaCrearPage;

	@ViewChild(Content) content: Content;
	@ViewChild('searchBar') myInput: any;

	isSearchbarOpened: boolean = false;
	loadInit: boolean = true;
	medicinasZero: boolean = true;

	medicinas: any = [];
	searchMedicinas: any = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public toastProvider: ToastProvider,
		public databaseProvider: DatabaseProvider,
		public modalCtrl: ModalController
	) {
	}

	ionViewDidLoad() {
	}

	ionViewWillEnter() {
		this.getAllMedicinas();
	}

	getMedicinasSearch() {
		this.medicinas = this.searchMedicinas;
	}

	cancelSearch() {
		setTimeout(() => {
			this.isSearchbarOpened = false;
			this.content.resize();
		}, 300);
	}

	openedSearch() {
		this.isSearchbarOpened = true;
		this.content.resize();
		setTimeout(() => {
			this.myInput.setFocus();
		}, 150);
	}

	modalCrear() {
		let medicinaCrearModal = this.modalCtrl.create(
			MedicinaCrearPage,
			{},
			{
				enableBackdropDismiss: false
			});

		medicinaCrearModal.onDidDismiss(data => {
			// console.log('onDidDismiss:::', data);
			if (typeof data !== "undefined") {
				this.getAllMedicinas();
				this.cancelSearch();
			}
		});
		medicinaCrearModal.present();
	}

	modalEditar(medicina: any) {
		let medicinaEditarModal = this.modalCtrl.create(
			MedicinaEditarPage,
			{ 'medicina': medicina },
			{
				enableBackdropDismiss: false
			});

		medicinaEditarModal.onDidDismiss(data => {
			// console.log('onDidDismiss:::', data);
			if (typeof data !== "undefined") {
				this.getAllMedicinas();
				this.cancelSearch();
			}
		});
		medicinaEditarModal.present();
	}

	async getAllMedicinas() {
		this.medicinas = [];
		this.loadInit = true;
		const orderBy = ' ORDER BY name ASC';
		await this.databaseProvider.getAllMedicamento(orderBy).then(response => {
			// console.log('getAllMedicamento:::res:::', response);
			this.loadInit = false;
			if (response.length === 0) {
				this.medicinas = [];
				this.medicinasZero = true;
			} else {
				this.medicinasZero = false;
				this.medicinas = response;
				this.searchMedicinas = response;
				this.content.resize();
			}
		}).catch(err => {
			this.loadInit = false;
			this.toastProvider.show("error", "No hemos cargado correcamente las medicinas, intentalo otra vez.", "bottom");
		});
	}

	getItems(ev: any) {
		this.getMedicinasSearch();
		let val = ev.target.value;
		if (val && val.trim() != '') {
			this.medicinas = this.medicinas.filter((item: any) => {
				return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
		}
	}

}
