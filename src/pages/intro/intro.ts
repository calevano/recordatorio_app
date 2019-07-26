import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html',
})
export class IntroPage {

    @ViewChild('slides') slider: any;

    keyIntro: string = 'recordatorio_intro';
    previus: boolean = false;
    next: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage
    ) {
        this.storage.get(this.keyIntro).then((val) => {
            if (val === 1) {
                this.navCtrl.setRoot(LoginPage);
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IntroPage');

    }

    ionViewDidEnter() {
        this.slideAutoplay();
    }

    goToLogin() {
        // this.storage.set(this.keyIntro, 1);
        this.navCtrl.setRoot(LoginPage);
    }

    nextSlide() {
        this.slider.slideNext();
    }

    prevSlide() {
        this.slider.slidePrev();
    }

    slideWillChange() {
        let current_ = this.slider.getActiveIndex();
        let init_ = this.slider.isBeginning();
        let end_ = this.slider.isEnd();
        if (init_) {
            this.previus = false;
            this.slider.lockSwipeToPrev(true);
            this.slider.lockSwipeToNext(false);
        }

        if (current_ === 0) {
            this.slider.lockSwipeToNext(false);
        } else {
            this.previus = true;
            this.next = true;
            this.slider.lockSwipes(false);
        }

        if (end_) {
            this.next = false;
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(true);
        }
    }

    slideAutoplay() {
        this.slider.lockSwipeToPrev(true);
    }

}
