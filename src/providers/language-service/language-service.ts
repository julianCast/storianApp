import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Globalization } from "ionic-native";

@Injectable()
export class LanguageService {
  public langSelected: string;
  public langConfig: any;

  constructor(
    private platform: Platform
  ) {}

  isSupported(langCode: string)
  {
    if (langCode == 'en' || langCode == 'es' ) {
      return true;
    }
  }

  selectBestLanguage()
  {
    return new Promise( (resolve, reject) => {

      if (this.platform.is('cordova')) {
        Globalization.getPreferredLanguage().then(
          (lang) => {
            const langCode = lang.value.substr(0, lang.value.indexOf('-'));
            if (this.isSupported(langCode)) {
              this.langSelected = langCode;
            } else {
              this.langSelected = "en";
            }
            resolve();
          }
        )
      } else {
        reject();
        this.langSelected = "es";
      }
    });

}


}
