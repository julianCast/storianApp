import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { StoryService } from '../../providers/story-service/story-service';
import { TranslateService } from '@ngx-translate/core';
import { NativeAudio } from '@ionic-native/native-audio';

declare var $: any;

@Component({
  templateUrl: 'home.html',
  selector: '.home-page'
})
export class HomePage {
  public dlgSelected: string = 'ch1'
  public character1 = {
    name: "",
    type: ""
  };
  public character2 = {
    name: "",
    type: ""
  };
  public placeSelected = "";
  public objectSelected = "";
  public story = {
    title: "",
    story: ""
  }
  constructor(
    public menu: MenuController,
    public storyService: StoryService,
    public translate: TranslateService,
    public nativeAudio: NativeAudio
    ){
    this.menu.swipeEnable(true, "sideMenu");
  }

  back(): void
  {
    // From character 2 to character 1
    if (this.dlgSelected == "ch2") {
      $('#ch2Area').addClass('bounceOutRight');
      $('#ch1Area').removeClass('bounceOutLeft');
      $('#ch1Area').removeClass('bounceInRight');
      setTimeout(function () {
        $('#ch1Area').addClass('bounceInLeft');
        this.dlgSelected = 'ch1';
        $('#ch2Area').removeClass('bounceOutRight');
      }.bind(this), 300);
    
    // From place to character 2
    } else if (this.dlgSelected == "place") {
      $('#placeArea').addClass('bounceOutRight');
      $('#ch2Area').removeClass('bounceOutLeft');
      $('#ch2Area').removeClass('bounceInRight');
      setTimeout(function () {
        $('#ch2Area').addClass('bounceInLeft');
        this.dlgSelected = 'ch2';
        $('#placeArea').removeClass('bounceOutRight');
      }.bind(this), 300);
    // From object to place
    } else if (this.dlgSelected == "object") {
      $('#objectArea').addClass('bounceOutRight');
      $('#placeArea').removeClass('bounceOutLeft');
      $('#placeArea').removeClass('bounceInRight');
      setTimeout(function () {
        $('#placeArea').addClass('bounceInLeft');
        this.dlgSelected = 'place';
        $('#objectArea').removeClass('bounceOutRight');
      }.bind(this), 300);
    }
  }

  next(): void
  {
    if (this.dlgSelected == "ch1") {
      $('#ch1Area').addClass('bounceOutLeft');
      setTimeout(() => {
        this.dlgSelected = 'ch2';
      }, 300);
    } else if (this.dlgSelected == "ch2") {
      $('#ch2Area').addClass('bounceOutLeft');
      setTimeout(() => {
        this.dlgSelected = 'place';
      }, 300);
    } else if (this.dlgSelected == "place") {
      $('#placeArea').addClass('bounceOutLeft');
      setTimeout(() => {
        this.dlgSelected = 'object';
      }, 300);
    }
  }

  selectPlace(place: string): void
  {
    this.nativeAudio.play('ding-selected')
    this.placeSelected = place;
  }

  selectObject(object: string): void
  {
    this.nativeAudio.play('ding-selected')
    this.objectSelected = object;
  }

  transPlaceDescription(): string
  {
    return this.translate.instant("STORY.DLG_DESCRIPTIONS."+this.placeSelected+"_desc");
  }

  transObjectDescription(): string
  {
    return this.translate.instant("STORY.DLG_DESCRIPTIONS."+this.objectSelected+"_desc");
  }

  createStory() 
  {
    this.storyService.getStory(this.character1, this.character2, this.placeSelected, this.objectSelected).then(
      data => {
        this.story.title = data['title'];
        this.story.story = data['story'];
        this.dlgSelected = 'story';
      },
      error => { }
    )
  }

  listenStory()
  {
 
  }

  ionViewDidEnter(): void
  {
    //this.dlgSelected = 'object';
  /* UNCOMMENT THIS TO SEE STORY EXAMPLE  this.story.title ="El guerrero de Sumatra";
    this.story.story = "Los Kalabubu poseen una forma circular con uña diámetro desde los 22 hasta los 25 centímetros. El grosor del kalabubu varía, siendo la parte central la más gruesa y luego gradualmente adelgazándose hacia ambos fines. Las puntas de los fines están conectadas para formar un disco hecho usualmente de latón, y en raras ocasiones oro. El marco interno del collar esta hecho de un alambre de hierro o latón que es atado al final. Este marco representa la gran serpiente dorada de la mitología de la isla. El elefante africano de sabana se caracteriza por su gran cabeza, amplias orejas que cubren los hombros, trompa larga y musculosa, presencia de dos colmillos en la mandíbula superior, bien desarrollados en ambos sexos aunque mayores en los machos. En su ambiente natural viven entre 40 y 50 años, pues un elefante adulto no tiene enemigos naturales, con excepción del hombre. A partir de los 40 años sus últimos dientes se desgastan y les es imposible comer, y mueren. En cautiverio pueden vivir más tiempo por los cuidados y alimentación que reciben; pueden llegar a los 60 años. ";
    this.dlgSelected = 'story'; */
  }


}
