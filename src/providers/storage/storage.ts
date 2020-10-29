import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const RECORDATORIO_INTRO_KEY = 'RECORDATORIO_INTRO_KEY';
const RECORDATORIO_LOGIN_KEY = 'RECORDATORIO_LOGIN_KEY';

@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage
  ) {
  }

  setStorageIntro() {
    this.storage.set(RECORDATORIO_INTRO_KEY, 1);
  }

  getStorageIntro() {
    return new Promise((resolve, reject) => {
      this.storage.get(RECORDATORIO_INTRO_KEY).then((val) => {
        if (val) {
          resolve(val);
        } else {
          resolve(false);
        }
      });
    });
  }

  setStorageLogin(name: string) {
    this.storage.set(RECORDATORIO_LOGIN_KEY, name);
  }

  getStorageLogin() {
    return new Promise((resolve, reject) => {
      this.storage.get(RECORDATORIO_LOGIN_KEY).then((val) => {
        if (val) {
          resolve(val);
        } else {
          resolve(false);
        }
      });
    });
  }
}
