import { Component } from '@angular/core';
import { MenuController, Keyboard } from 'ionic-angular';
import { StoryService } from '../../providers/story-service/story-service';
import { TranslateService } from '@ngx-translate/core';
import { NativeAudio } from '@ionic-native/native-audio';

declare var $: any;
declare var DotNav: any

@Component({
  templateUrl: 'home.html',
  selector: '.home-page'
})
export class HomePage {
  public dlgSelected: string = 'ch1';

  public characters = {
    'ch1' : {
      name: "",
      type: "",
      genre: ""
    },
    'ch2' : {
      name: "",
      type: "",
      genre: ""
    }
  }
  public charactersFixedSex = {
    'centaur' : "male",
    'satyr' : "male",
    'medusa' : "female",
    'fairy' : "female",
    'harpy' : "female",
    'mermaid' : "female",
    'witch' : "female"
  };
  public placeSelected = "";
  public objectSelected = "";
  public story = {
    title: "",
    story: ""
  }
  public editingType : boolean = false;
  constructor(
    public menu: MenuController,
    public storyService: StoryService,
    public translate: TranslateService,
    public nativeAudio: NativeAudio,
    public keyboard: Keyboard
    ){
    this.menu.swipeEnable(true, "sideMenu");   
  }

  back(): void
  {
    this._cleanAnimationClasses();
    // From character 2 to character 1
    if (this.dlgSelected == "ch2") {
      $('#charactersArea').addClass('animated bounceOutRight');
      setTimeout(function () {
        this._cleanAnimationClasses();
        $('#charactersArea').addClass('animated bounceInLeft');   
        this.dlgSelected = 'ch1';     
        $('#ch1-dot').click();
      }.bind(this), 300);
    
    // From object to character 2
    } else if (this.dlgSelected == "object") {
      $('#objectArea').addClass('bounceOutRight');
      setTimeout(function () {
        this.dlgSelected = 'ch2';
        $('#charactersArea').ready(
          () => {
            this._cleanAnimationClasses();
            $('#charactersArea').addClass('animated bounceInLeft');
          }
        );
        $('#objectArea').removeClass('bounceOutRight');
        $('#ch2-dot').click();
      }.bind(this), 300);
    
    // From place to object
    } else if (this.dlgSelected == "place") {
      $('#placeArea').addClass('bounceOutRight');
      setTimeout(function () {
        $('#objectArea').removeClass('bounceInLeft bounceInRight bounceOutRight bounceOutLeft').addClass('bounceInLeft');
        this.dlgSelected = 'object';
        $('#placeArea').removeClass('bounceOutRight');
        $('#object-dot').click();
      }.bind(this), 300);
  
    } 
  }

  next(): void
  {
    this._cleanAnimationClasses();
    if (this.dlgSelected == "ch1") {
      $('#charactersArea').addClass('animated bounceOutLeft');
      setTimeout(() => {
        this.dlgSelected = 'ch2';
        this._cleanAnimationClasses();
      $('#charactersArea').addClass('animated bounceInRight');
        $('#ch2-dot').click();
      }, 300);

    } else if (this.dlgSelected == "ch2") {
      $('#charactersArea').addClass('animated bounceOutLeft');
      setTimeout(() => {
        $('#charactersArea').addClass('bounceInLeft');
        this.dlgSelected = 'object';
        this._cleanAnimationClasses();
        $('#objectArea').addClass('animated bounceInRight');
        $('#object-dot').click();
      }, 300);
    } else if (this.dlgSelected == "object") {
      $('#objectArea').addClass('animated bounceOutLeft');
      setTimeout(() => {
        this.dlgSelected = 'place';
        $('#placeArea').addClass('animated bounceInRight');
        $('#place-dot').click();
      }, 300);
    } else if (this.dlgSelected == "place") {
      $('#placeArea').addClass('animated bounceOutLeft');
      setTimeout(() => {
        this.dlgSelected = 'story';
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

  selectGenre(e, genre: string): void
  {
    this.nativeAudio.play('ding-selected');
    let genreContainer = $('#genre-buttons');
 
    if (!genreContainer.hasClass('disabled')) {
      this.characters[this.dlgSelected]['genre'] = genre;
      if ( this.characters[this.dlgSelected].name &&  this.characters[this.dlgSelected].type) {
        setTimeout(() => {
          this.next();
        }, 500);
      }
    }
  
  }
  selectType(e,type: string): void
  {
    // this.nativeAudio.play('ding-selected')
   let characterContainer = $(e.target).parent();
   if (!characterContainer.hasClass('selected') && !characterContainer.hasClass('disabled')) {
      this.characters[this.dlgSelected]['type'] = type;
      if (this.genreIsFixed()) {
        this.characters[this.dlgSelected]['genre'] =  this.charactersFixedSex[this.characters[this.dlgSelected].type];
      } else {
        this.characters[this.dlgSelected]['genre'] = "";
      }
    }
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
    this.storyService.getStory(this.characters['ch1'], this.characters['ch2'], this.placeSelected, this.objectSelected).then(
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

  _cleanAnimationClasses(): void
  {
    $('#charactersArea').removeClass('animated bounceOutLeft bounceOutRight bounceInLeft bounceInRight');
  }

  genreIsFixed(): boolean
  {
    if (this.dlgSelected == "ch1" || this.dlgSelected == "ch2") {
      return this.charactersFixedSex[this.characters[this.dlgSelected].type];
    }
  }


  _loadNavigationDotSystem(): void
  {
    [].slice.call( document.querySelectorAll( '.dotstyle > ul' ) ).forEach( function( nav ) {
      new DotNav( nav, {
        callback : function( idx ) {
          console.log( idx )
        }
      } );
    } );
  }
  ionViewWillEnter(){
   this._loadNavigationDotSystem();
  }
  ionViewDidEnter(): void
  {
    //this.dlgSelected = 'place';
  /* UNCOMMENT THIS TO SEE STORY EXAMPLE  this.story.title ="El guerrero de Sumatra";
    this.story.story = "Los Kalabubu poseen una forma circular con uña diámetro desde los 22 hasta los 25 centímetros. El grosor del kalabubu varía, siendo la parte central la más gruesa y luego gradualmente adelgazándose hacia ambos fines. Las puntas de los fines están conectadas para formar un disco hecho usualmente de latón, y en raras ocasiones oro. El marco interno del collar esta hecho de un alambre de hierro o latón que es atado al final. Este marco representa la gran serpiente dorada de la mitología de la isla. El elefante africano de sabana se caracteriza por su gran cabeza, amplias orejas que cubren los hombros, trompa larga y musculosa, presencia de dos colmillos en la mandíbula superior, bien desarrollados en ambos sexos aunque mayores en los machos. En su ambiente natural viven entre 40 y 50 años, pues un elefante adulto no tiene enemigos naturales, con excepción del hombre. A partir de los 40 años sus últimos dientes se desgastan y les es imposible comer, y mueren. En cautiverio pueden vivir más tiempo por los cuidados y alimentación que reciben; pueden llegar a los 60 años. ";
    this.dlgSelected = 'story'; */
  }


}
