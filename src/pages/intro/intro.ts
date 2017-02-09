import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ConfigService } from '../../providers/config-service/config-service';

@Component({
  templateUrl: 'intro.html',
  selector: '.intro-page'
})
export class IntroPage {

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public config: ConfigService,
  ) {

  }
  loadApp() {
    this.nav.setRoot(HomePage);
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, "sideMenu");
  }

}
