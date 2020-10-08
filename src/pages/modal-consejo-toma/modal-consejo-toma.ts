import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-modal-consejo-toma',
    templateUrl: 'modal-consejo-toma.html',
})
export class ModalConsejoTomaPage {

    consejoToma: any;
    consejos: any[] = [
        'Ninguno',
        'Antes de la comida',
        'Junto con la comida',
        'Después de la comida'
    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
        // console.log('ModalConsejoTomaPage:::constructor');
        const consejoToma_ = navParams.get('consejoToma');
        // console.log('ModalConsejoTomaPage:::constructor:::consejoToma_:::', consejoToma_);
        if (consejoToma_ !== '') {
            this.consejoToma = consejoToma_;
        }
    }

    ionViewDidLoad() {
        // console.log('ModalConsejoTomaPage:::ionViewDidLoad');
    }

    selectOption(value_: string) {
        // console.log('ModalConsejoTomaPage:::selectOpcion:::', value_);
        this.consejoToma = this.consejos[value_];
        // console.log('ModalConsejoTomaPage:::selectOpcion:::consejo:::', this.consejoToma);
        let data = { 'consejoToma': this.consejoToma };
        this.viewCtrl.dismiss(data);
    }

    selectOpcionButton() {
        // console.log('ModalConsejoTomaPage:::selectOpcionButton');
        let data = { 'consejoToma': this.consejoToma };
        this.viewCtrl.dismiss(data);
    }

    dismiss() {
        // console.log('ModalConsejoTomaPage:::dismiss');
        this.viewCtrl.dismiss();
    }

}
