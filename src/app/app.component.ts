import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';

// import { IntroPage } from '../pages/intro/intro';
// import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private headerColor: HeaderColor,
    ) {
        platform.ready().then(() => {
            this.rootPage = TabsPage;
            if (platform.is('cordova')) {
                if (platform.is('android')) {
                    this.headerColor.tint('#1976D2');
                    statusBar.backgroundColorByHexString('#33000000');
                } else {
                    statusBar.styleLightContent();
                }
                splashScreen.hide();
            }

        });
    }
}
