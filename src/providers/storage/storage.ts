import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const RECORDATORIO_INTRO_KEY = 'RECORDATORIO_INTRO_KEY';
const RECORDATORIO_LOGIN_KEY = 'RECORDATORIO_LOGIN_KEY';

@Injectable()
export class StorageProvider {

    constructor(
        private storage: Storage
    ) {
        console.log('StorageProvider Hello');
    }

    setStorageIntro() {
        console.log("StorageProvider:::setStorageIntro:::1");
        this.storage.set(RECORDATORIO_INTRO_KEY, 1);
    }

    getStorageIntro() {
        console.log("StorageProvider:::getStorageIntro");
        return new Promise((resolve, reject) => {

            this.storage.get(RECORDATORIO_INTRO_KEY).then((val) => {
                if (val) {
                    resolve(val);
                } else {
                    resolve(false);
                }
            });

            // else {
            //     if (localStorage.getItem(RECORDATORIO_INTRO_KEY)) {
            //         resolve(localStorage.getItem(RECORDATORIO_INTRO_KEY));
            //     } else {
            //         resolve(false);
            //     }
            // }
        });

        // if (this.platform.is('cordova')) {
        //     return this.storage.get(RECORDATORIO_INTRO_KEY);
        // } else {
        //     return localStorage.getItem(RECORDATORIO_INTRO_KEY);
        // }

        // return this.storage.get(RECORDATORIO_INTRO_KEY);
    }

    setStorageLogin(name: string) {
        console.log("StorageProvider:::setStorageLogin:::", name);
        this.storage.set(RECORDATORIO_LOGIN_KEY, name);
    }

    getStorageLogin() {
        console.log("StorageProvider:::getStorageLogin");
        return new Promise((resolve, reject) => {

            this.storage.get(RECORDATORIO_LOGIN_KEY).then((val) => {
                if (val) {
                    resolve(val);
                } else {
                    resolve(false);
                }
            });

            // else {
            //     if (localStorage.getItem(RECORDATORIO_LOGIN_KEY)) {
            //         resolve(localStorage.getItem(RECORDATORIO_LOGIN_KEY));
            //     } else {
            //         resolve(false);
            //     }
            // }
        });

        // if (this.platform.is('cordova')) {
        //     return this.storage.get(RECORDATORIO_LOGIN_KEY);
        // } else {
        //     return localStorage.getItem(RECORDATORIO_LOGIN_KEY);
        // }

        // return this.storage.get(RECORDATORIO_LOGIN_KEY);
    }
}
