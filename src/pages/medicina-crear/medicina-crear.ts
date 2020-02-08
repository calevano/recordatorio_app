import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Provider
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
	selector: 'page-medicina-crear',
	templateUrl: 'medicina-crear.html',
})
export class MedicinaCrearPage {

	medicinaForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public toastProvider: ToastProvider,
		public loadingProvider: LoadingProvider,
		public databaseProvider: DatabaseProvider
	) {
		this.medicinaForm = this.formBuilder.group({
			name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
		});
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad MedicinaCrearPage');
	}

	dismiss() {
		// console.log('ModalConsejoTomaPage:::dismiss');
		this.viewCtrl.dismiss();
	}

	async addMedicamento() {
		if (!this.medicinaForm.valid) {
			this.toastProvider.show('error', 'Debe ingresar el nombre del medicamento', 'bottom');
		} else {
			let dataForm_ = this.medicinaForm.value;
			let nameTrim = dataForm_.name.trim();
			if (nameTrim === "") {
				this.toastProvider.show('error', 'Debe ingresar el nombre del medicamento', 'bottom');
			} else {
				let data_ = {};
				data_['name'] = nameTrim;
				this.loadingProvider.show("Agregando medicamento");
				// console.log("addMedicamento:::data:::", data_);
				await this.databaseProvider.insertMedicamento(data_).then(response => {
					this.toastProvider.show('success', 'Se agrego el medicamento', 'bottom');
					this.loadingProvider.hide(0);
					let data = { 'name': nameTrim };
					this.viewCtrl.dismiss(data);
				}).catch(err => {
					this.toastProvider.show('error', 'No se pudo agregar. favor de intentarlo de nuevo', 'bottom');
					this.loadingProvider.hide(0);
					this.dismiss();
				});
			}
		}
	}

}
