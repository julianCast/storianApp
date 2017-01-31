import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigService {
public languageUser: string;

  constructor(
    private storage: Storage
  ) {}

  getLanguageUser() {
    return new Promise((resolve, reject) => {
      this.storage.get('language').then(
        data => {
          console.log('dataa',data);

          const lang = data ? data : null;
          console.log('getLanguageUser',lang);
          resolve(lang);
        },
        error => {
          reject();
        });
    });
  }

    setLanguageUser(lang) {
      this.languageUser = lang;
      return this.storage.set('language', lang);
  }

}
