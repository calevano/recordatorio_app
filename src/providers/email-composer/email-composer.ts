import { Injectable } from '@angular/core';
// Plugins
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class EmailComposerProvider {

  constructor(
    private emailComposer: EmailComposer
  ) {
  }

  permiso() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) { }
    });
  }

  create(email_: string, data: any) {
    let email = {
      app: 'gmail',
      to: email_,
      subject: data.subject,
      body: data.body,
    };
    this.emailComposer.open(email);
  }

}
