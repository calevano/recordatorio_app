import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { StorageProvider } from '../../providers/storage/storage';

@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html',
})
export class IntroPage {

    @ViewChild(Slides) slider: Slides;
    
    previus: boolean = false;
    next: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storageProvider: StorageProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IntroPage');
    }

    ionViewDidEnter() {
        this.slideAutoplay();
    }

    goToLogin() {
        this.storageProvider.setStorageIntro();
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
