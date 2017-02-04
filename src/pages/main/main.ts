import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'main.html',
  selector: '.main-page'
})
export class MainPage {

  constructor(public menu: MenuController) {
    this.menu.swipeEnable(true, "sideMenu");
  }


}
