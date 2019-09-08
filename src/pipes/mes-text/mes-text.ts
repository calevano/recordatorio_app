import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mesText',
})
export class MesTextPipe implements PipeTransform {

    transform(value: string, args: any) {
        let valueInt = parseInt(value);
        let arrayMes = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Setiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];

        return arrayMes[valueInt - 1];
    }
}
