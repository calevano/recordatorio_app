import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Provider
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
	selector: 'page-medicina-editar',
	templateUrl: 'medicina-editar.html',
})
export class MedicinaEditarPage {

	medicinaForm: FormGroup;
	medicina: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public toastProvider: ToastProvider,
		public loadingProvider: LoadingProvider,
		public databaseProvider: DatabaseProvider
	) {
		this.medicina = navParams.get('medicina');
		console.log('medicina:::', this.medicina);
		this.medicinaForm = this.formBuilder.group({
			name: [this.medicina.name, Validators.compose([Validators.required, Validators.minLength(3)])],
		});
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad MedicinaEditarPage');
	}

	dismiss() {
		// console.log('ModalConsejoTomaPage:::dismiss');
		this.viewCtrl.dismiss();
	}

	async editMedicamento() {
		if (!this.medicinaForm.valid) {
			this.toastProvider.show('error', 'Debe ingresar el nombre del medicamento', 'bottom');
		} else {
			let dataForm_ = this.medicinaForm.value;
			let nameTrim = dataForm_.name.trim();
			if (nameTrim === "") {
				this.toastProvider.show('error', 'Debe ingresar el nombre del medicamento', 'bottom');
			} else {
				let data_ = {};
				data_['id'] = this.medicina.id;
				data_['name'] = nameTrim;
				this.loadingProvider.show("Editando medicamento");
				// console.log("editMedicamento:::data:::", data_);
				await this.databaseProvider.updateMedicamento(data_).then(response => {
					this.toastProvider.show('success', 'Se edito el medicamento', 'bottom');
					this.loadingProvider.hide(0);
					let data = { 'name': nameTrim };
					this.viewCtrl.dismiss(data);
				}).catch(err => {
					this.toastProvider.show('error', 'No se pudo editar. favor de intentarlo de nuevo', 'bottom');
					this.loadingProvider.hide(0);
					this.dismiss();
				});
			}
		}
	}

}
