import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingPage } from '../loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastProvider: ToastProvider,
        public formBuilder: FormBuilder,
    ) {
        this.loginForm = this.formBuilder.group({
            nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ingresarApp() {
        if (!this.loginForm.valid) {
            this.toastProvider.showToast("dark", "Debes ingresar un nombre", 'bottom');
        } else {
            setTimeout(() => {
                this.navCtrl.setRoot(LoadingPage, {
                    message: 'Estamos guardando tu nombre, solo será unos segundos',
                    reference: 'login'
                });
            }, 500);
        }
    }

}
