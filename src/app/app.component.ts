import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { TabsPage } from '../pages/tabs/tabs';
import { LanguageService } from '../providers/language-service/language-service';
import { ConfigService } from '../providers/config-service/config-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private language: LanguageService,
    private config: ConfigService
    ) {
    //Check if language is stored and set it
    config.getLanguageUser().then(
      data => {
        if (!data) {
          // Set the default language for translation strings, and the current language.
          language.selectBestLanguage().then(
            done => {
              translate.use(language.langSelected);
              config.setLanguageUser(language.langSelected);
            },
            error => {}
          );
        } else {
          console.log('language stored!',data );
        }
      }
    )
    translate.setDefaultLang('es');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
