import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';
import 'moment/locale/es';

@Pipe({
    name: 'moment',
})
export class MomentPipe implements PipeTransform {

    transform(date: any, format: any) {
        return moment(date).format(format);
    }

}