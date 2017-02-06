import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { LanguageService } from '../providers/language-service/language-service';
import { ConfigService } from '../providers/config-service/config-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = IntroPage;
  public pages;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private language: LanguageService,
    private config: ConfigService
  ) {

    // Pages showed on #sideMenu
    this.pages = {
      settings: SettingsPage,
      home: HomePage
    };

    // Initial userConfig
    let userConfig = {
      "language": null,
      "sound": true,
      "night-mode": false
    };

    // On first time, save config
    config.getConfig().then(
      (data) => {
        if (!data) {
          if (config.setConfig(userConfig)) {
            //Check if language is stored and set it
            if (!config.getLanguageUser()) {
              // Set the default language for translation strings, and the current language.
              language.selectBestLanguage().then(
                done => {
                  translate.use(language.langSelected);
                  config.setConfigAtt("language", language.langSelected);
                },
                error => { }
              );
            }

          }
        } else {
          config.getConfig().then(
            data => {
              translate.use(config.getLanguageUser());
            }
          )
        }
      },
      e => {
        console.log('error getting config', e);
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
  openPage(page) {
    this.nav.setRoot(page);
  }
}
