import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-border-footer',
  templateUrl: 'header-border-footer.html'
})
export class HeaderBorderFooterComponent {

  @Input() miColor: any;

  text: string;

  constructor() {
    console.log('Hello HeaderBorderFooterComponent Component');
    this.text = 'Hello World';
  }

}
