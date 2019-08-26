import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

    private loading: any;

    constructor(
        public loadingCtrl: LoadingController,
    ) {
        console.log('LoadingProvider Hello');
    }

    preload(text_?: string) {
        text_ = (text_ === undefined) ? "" : text_;
        this.loading = this.loadingCtrl.create({
            content: text_,
            duration: 1000
        });
        this.loading.present();
    }

    show(text_?: string) {
        if (!this.loading) {
            text_ = (text_ === undefined) ? "" : text_;
            this.loading = this.loadingCtrl.create({
                content: text_
            });
            this.loading.present();
        }
    }

    hide(time_?: number) {
        if (this.loading) {
            time_ = (time_ === undefined) ? 3000 : time_;
            setTimeout(() => {
                this.loading.dismiss();
                this.loading = null;
            }, time_);
        }
    }

}
