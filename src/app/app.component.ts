import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeAudio } from 'ionic-native';
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
    public language: LanguageService,
    public config: ConfigService
  ) {

    // Pages showed on #sideMenu
    this.pages = {
      settings: SettingsPage,
      home: HomePage
    };


    let musicVolume: number = 0.4;

    // Load config
    config.getConfig().then(
      (data) => {
        config.updateCollection();
        translate.use(data['language']);
        if (this.platform.is('cordova')) {
          NativeAudio.preloadComplex('main-ambient', 'assets/sound/music-background.mp3', musicVolume, 1, 1).then(
            function () {
              if (config.getSoundUser()) {
                NativeAudio.play('main-ambient').then(function (msg) { console.info(msg) }, function (msg) { console.info(msg) });
              }
            }.bind(this));
        }
        console.log('user-config', config)
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
