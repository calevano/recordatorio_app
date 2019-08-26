import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keyValue',
})
export class KeyValuePipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        let keys = [];
        for (let key in value) {
            console.log("key:::", key);
            console.log("value:::", value);
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}
