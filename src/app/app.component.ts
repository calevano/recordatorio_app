import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { SQLite } from '@ionic-native/sqlite';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StorageProvider } from '../providers/storage/storage';
import { DatabaseProvider } from '../providers/database/database';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        private headerColor: HeaderColor,
        public databaseProvider: DatabaseProvider,
        private storageService: StorageProvider,
        public sqlite: SQLite
    ) {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                if (this.platform.is('android')) {
                    this.headerColor.tint('#1976D2');
                    this.statusBar.backgroundColorByHexString('#33000000');
                } else {
                    this.statusBar.styleLightContent();
                }
                this.createDatabase();
            } else {
                this.getIntro();
            }
        });
    }

    private createDatabase() {
        this.sqlite.create({
            name: 'recordatorio.db',
            location: 'default'
        }).then((db) => {
            this.databaseProvider.setDatabase(db);
            this.databaseProvider.createTableMedicines();
            this.databaseProvider.createTableReminders();
            this.databaseProvider.createTableReminderTimes();
            this.databaseProvider.createTableDoctors();
            this.databaseProvider.createTableDoctorAppointments();
            return true;
        }).then(() => {
            this.getIntro();
            this.splashScreen.hide();
        }).catch(error => {
            console.error(error);
        });
    }

    async getIntro() {
        await this.storageService.getStorageIntro().then((intro: any) => {
            console.log("intro:::", intro);
            if (intro) {
                this.getLogin();
            } else {
                this.rootPage = IntroPage;
            }
        });
    }

    async getLogin() {
        await this.storageService.getStorageLogin().then((login: any) => {
            console.log("login:::", login);
            this.rootPage = (login) ? TabsPage : LoginPage;
        });
    }

}
