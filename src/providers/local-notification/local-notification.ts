import { Injectable } from '@angular/core';
//Plugins
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class LocalNotificationProvider {

    constructor(
        private localNotifications: LocalNotifications
    ) {
        console.log('LocalNotificationProvider:::Provider');
    }

    create(content_: any) {
        let date_ = new Date(content_['datehour']);
        this.localNotifications.schedule({
            title: content_['title'],
            text: content_['text'],
            trigger: { at: date_ }
        });
    }

    example() {
        let date_ = new Date("2019-09-08 13:42");
        console.log("date____:::", date_);
        this.localNotifications.schedule({
            title: 'Título',
            text: 'Contenido de la toma trigger',
            trigger: { at: date_ }
        });
    }

}
