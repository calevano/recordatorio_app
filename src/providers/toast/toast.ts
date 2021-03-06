import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

    private toast: any;

    constructor(
        public toastCtrl: ToastController,
    ) {
        // console.log('ToastProvider Hello');
    }

    show(cssClass_: string, message_: string, position_?: string, time_?: number) {
        position_ = (position_ === undefined) ? "top" : position_;
        time_ = (time_ === undefined) ? 5000 : time_;
        if (this.toast) {
            this.toast.dismiss();
        }

        this.toast = this.toastCtrl.create({
            message: message_,
            duration: time_,
            position: position_,
            cssClass: ' toastPersonalizado ' + cssClass_,
            showCloseButton: true,
            closeButtonText: 'OK'
        });

        this.toast.onDidDismiss(() => { });

        this.toast.present();
    }

}
