import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { StoryService } from '../../providers/story-service/story-service';

declare var $: any;

@Component({
  templateUrl: 'home.html',
  selector: '.home-page'
})
export class HomePage {
  public select: string = 'ch1'
  public character1 = {
    name: "",
    type: ""
  };
  public character2 = {
    name: "",
    type: ""
  };
  public placeSelected = "castle";
  public story = {
    title: "",
    story: ""
  }
  constructor(
    public menu: MenuController,
    public storyService: StoryService
    ){
    this.menu.swipeEnable(true, "sideMenu");
  }

  checkCH1() {
    if (this.character1.name && this.character1.type) {
      $('#ch1Area').addClass('animated bounceOutLeft');
      setTimeout(function () {
        this.select = 'ch2';
      }.bind(this), 400);
    } else if (!this.character1.name) {
      $("#name-ch1")
        .removeClass('animated shake bounceInUp')
        .addClass('animated shake');
      setTimeout(function () {
        $("#name-ch1").removeClass('animated shake');
      }, 1000);
    }
    else if (!this.character1.type) {
      $("#type-ch1")
        .removeClass('animated shake bounceInUp')
        .addClass('animated shake').delay(0);
      setTimeout(function () {
        $("#type-ch1").removeClass('animated shake');
      }, 1500);
    }
  }

  checkCH2() {
    if (this.character2.name && this.character2.type) {
      $('#ch2Area').addClass('animated bounceOutLeft');
      setTimeout(function () {
        this.select = 'place';
      }.bind(this), 400);
    } else if (!this.character2.name) {
      $("#name-ch2")
        .removeClass('animated shake bounceInUp')
        .addClass('animated shake');
      setTimeout(function () {
        $("#name-ch2").removeClass('animated shake');
      }, 1000);
    }
    else if (!this.character2.type) {
      $("#type-ch2")
        .removeClass('animated shake bounceInUp')
        .addClass('animated shake').delay(0);
      setTimeout(function () {
        $("#type-ch2").removeClass('animated shake');
      }, 1500);
    }
  }

  createStory() {
    this.storyService.getStory(this.character1, this.character2, this.placeSelected).then(
      data => {
        this.story.title = data['title'];
        this.story.story = data['story'];
        this.select = 'story';
      },
      error => {

      }
    )
  }

  listenStory()
  {
    let data = {
      text: this.story.title,
      locale: 'es-ES',
      rate: 1.0
    }
  }

  ionViewDidEnter(){
    let data = {
      text: 'Tu cuento esta listo',
      locale: 'es-ES',
      rate: 1.0
    }
    this.story.title ="El guerrero de Sumatra";
    this.story.story = "Los Kalabubu poseen una forma circular con uña diámetro desde los 22 hasta los 25 centímetros. El grosor del kalabubu varía, siendo la parte central la más gruesa y luego gradualmente adelgazándose hacia ambos fines. Las puntas de los fines están conectadas para formar un disco hecho usualmente de latón, y en raras ocasiones oro. El marco interno del collar esta hecho de un alambre de hierro o latón que es atado al final. Este marco representa la gran serpiente dorada de la mitología de la isla. ";
    this.select = 'story';
  }


}
