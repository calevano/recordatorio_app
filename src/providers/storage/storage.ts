import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

const RECORDATORIO_INTRO_KEY = 'RECORDATORIO_INTRO_KEY';
const RECORDATORIO_LOGIN_KEY = 'RECORDATORIO_LOGIN_KEY';

@Injectable()
export class StorageProvider {

    constructor(
        private platform: Platform,
        private storage: Storage
    ) {
        console.log('Hello StorageProvider Provider');
    }

    setStorageIntro() {
        console.log("Seteando:::Intro:::");
        console.log("StorageProvider:::setStorageIntro:::1");
        if (this.platform.is('cordova')) {
            this.storage.set(RECORDATORIO_INTRO_KEY, 1);
        } else {
            localStorage.setItem(RECORDATORIO_INTRO_KEY, '1');
        }
    }

    getStorageIntro() {
        console.log("Obteniendo:::Intro:::");
        console.log("StorageProvider:::getStorageIntro...");
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                this.storage.get(RECORDATORIO_INTRO_KEY).then((val) => {
                    if (val) {
                        resolve(val);
                    } else {
                        resolve(false);
                    }
                });
            } else {
                if (localStorage.getItem(RECORDATORIO_INTRO_KEY)) {
                    resolve(localStorage.getItem(RECORDATORIO_INTRO_KEY));
                } else {
                    resolve(false);
                }
            }
        });

        // if (this.platform.is('cordova')) {
        //     return this.storage.get(RECORDATORIO_INTRO_KEY);
        // } else {
        //     return localStorage.getItem(RECORDATORIO_INTRO_KEY);
        // }

        // return this.storage.get(RECORDATORIO_INTRO_KEY);
    }

    setStorageLogin(name: string) {
        console.log("Seteando:::NombreLogin:::");
        console.log("StorageProvider:::setStorageLogin:::", name);
        if (this.platform.is('cordova')) {
            this.storage.set(RECORDATORIO_LOGIN_KEY, name);
        } else {
            localStorage.setItem(RECORDATORIO_LOGIN_KEY, name);
        }
    }

    getStorageLogin() {
        console.log("Obteniendo:::NombreLogin:::");
        console.log("StorageProvider:::getStorageLogin...");
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                this.storage.get(RECORDATORIO_LOGIN_KEY).then((val) => {
                    if (val) {
                        resolve(val);
                    } else {
                        resolve(false);
                    }
                });
            } else {
                if (localStorage.getItem(RECORDATORIO_LOGIN_KEY)) {
                    resolve(localStorage.getItem(RECORDATORIO_LOGIN_KEY));
                } else {
                    resolve(false);
                }
            }
        });

        // if (this.platform.is('cordova')) {
        //     return this.storage.get(RECORDATORIO_LOGIN_KEY);
        // } else {
        //     return localStorage.getItem(RECORDATORIO_LOGIN_KEY);
        // }

        // return this.storage.get(RECORDATORIO_LOGIN_KEY);
    }
}