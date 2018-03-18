import { Component } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';
import { ConfigService } from '../../providers/config-service/config-service';
import { TranslateService } from "@ngx-translate/core";
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'settings.html',
  selector: '.settings-page'
})
export class SettingsPage {
  protected userLanguage: string;
  private userSound: boolean;
  private nightMode: boolean;

  constructor(
    public menu: MenuController,
    public nav: Nav,
    public config: ConfigService,
    public translate: TranslateService
  ) {
    
  }

  goHome() {
    this.nav.setRoot(HomePage);
  }

  changeLanguage(language) {
    this.config.languageUser = language;

    this.config.setConfigAtt("language", language);
    this.translate.use(language)
  }

  changeSounds() {
    this.config.sound = this.userSound;
    this.config.setConfigAtt("sound", this.userSound);
  }

  changeNightMode() {
    this.config.nightMode = this.nightMode;
    this.config.setConfigAtt("night-mode", this.nightMode);
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(true, "sideMenu");
    this.userSound = this.config.getSoundUser();
    this.userLanguage = this.config.getLanguageUser();
    this.nightMode = this.config.getNightModeUser();
  }
}
