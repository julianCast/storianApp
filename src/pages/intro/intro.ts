import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'intro.html',
  selector: '.intro-page'
})
export class IntroPage {

  constructor(
    public nav: NavController,
    public menu: MenuController
  ) {
    this.menu.swipeEnable(false, "sideMenu");
  }
  loadApp() {
    this.nav.setRoot(HomePage);
  }
}
