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
        // let date_ = new Date(content_['datehour']);
        console.log('dateHour:::', content_['dateHour']);
        let date_: any;
        let contentHour_ = content_.dateHour;
        let fechaHora = contentHour_.split(' ');
        let fecha_ = fechaHora[0].split('-');
        let hora_ = fechaHora[1].split(':');
        date_ = new Date(parseInt(fecha_[0]), parseInt(fecha_[1]) - 1, parseInt(fecha_[2]), parseInt(hora_[0]), parseInt(hora_[1]));
        this.localNotifications.schedule({
            id: content_.id,
            title: content_.title,
            text: content_.text,
            vibrate: true,
            trigger: { at: date_ },
            led: 'FF0000',
            foreground: true,
            lockscreen: true
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
