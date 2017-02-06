import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'home.html',
  selector: '.home-page'
})
export class HomePage {

  constructor(public menu: MenuController) {
    this.menu.swipeEnable(true, "sideMenu");
  }


}
