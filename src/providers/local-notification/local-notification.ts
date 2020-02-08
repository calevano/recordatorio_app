import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
//Plugins
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';

@Injectable()
export class LocalNotificationProvider {

    constructor(
        public platform: Platform,
        private localNotifications: LocalNotifications
    ) {
        // console.log('LocalNotificationProvider:::Provider');
    }

    async create(content_: any) {
        let date_: any;
        let contentHour_ = content_.dateHour;
        let fechaHora = contentHour_.split(' ');
        let fecha_ = fechaHora[0].split('-');
        let hora_ = fechaHora[1].split(':');
        date_ = new Date(parseInt(fecha_[0]), parseInt(fecha_[1]) - 1, parseInt(fecha_[2]), parseInt(hora_[0]), parseInt(hora_[1]));
        let contentSchedule: ILocalNotification = {
            id: content_.id,
            title: content_.title,
            text: content_.text,
            trigger: { at: date_ },
            foreground: true,
            lockscreen: true,
            // launch: true,
            sound: this.setSound()
        };
        if (this.platform.is('android')) {
            // contentSchedule.group = content_.group;
            contentSchedule.led = 'FF0000';
            contentSchedule.vibrate = true;
        }
        this.localNotifications.schedule(contentSchedule);
    }

    async update(content_: any) {
        let date_: any;
        let contentHour_ = content_.dateHour;
        let fechaHora = contentHour_.split(' ');
        let fecha_ = fechaHora[0].split('-');
        let hora_ = fechaHora[1].split(':');
        date_ = new Date(parseInt(fecha_[0]), parseInt(fecha_[1]) - 1, parseInt(fecha_[2]), parseInt(hora_[0]), parseInt(hora_[1]));
        let contentSchedule: ILocalNotification = {
            id: content_.id,
            title: content_.title,
            text: content_.text,
            trigger: { at: date_ }
        };
        this.localNotifications.update(contentSchedule);
    }

    setSound() {
        if (this.platform.is('android')) {
            return 'file://assets/sounds/alerta.mp3'
        } else {
            return 'file://assets/sounds/alerta.mp3'
        }
    }

    async delete(id: any) {
        // console.log('delete:::id:::', id);
        await this.localNotifications.clear(id).then(res => {
            // console.log('delete:::res:::', res);
        }).catch(err => {
            // console.log('delete:::err:::', err);
        });
    }

}
