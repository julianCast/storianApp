import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import { ConfigService } from '../config-service/config-service';
import { Storage } from '@ionic/storage';

@Injectable()
export class StoryService {
  public langSelected: string;
  public langConfig: any;
  public unreadStories: any = {};
  private readStoriesIDs: any = []
  private totalNumberOfStories: 0;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  getStory(character1, character2, place, object): {story: string, title: string} 
  {
    console.log(character1, character2, place, object);
   /* 2. GET GRAMMAR */
    // Character 1
    let artDetP1m,artDetP1,oaP1,pronP1,detIndP1,neutP1
    if (character1.sexGenre == "male") {
      artDetP1m = "El"; artDetP1 = "el"; oaP1 = "o"; pronP1 = "él"; detIndP1 = "un"; neutP1 = "lo";
    } else {
      artDetP1m = "La"; artDetP1 = "la"; oaP1 = "a"; pronP1 = "ella"; detIndP1 = "una"; neutP1 = "la";
    }
    // Character 2
    let artDetP2m,artDetP2,oaP2,pronP2,detIndP2,neutP2
    if (character2.sexGenre == "male") {
      artDetP2m = "El"; artDetP2 = "el"; oaP2 = "o"; pronP2 = "él"; detIndP2 = "un"; neutP2 = "lo";
    } else {
      artDetP2m = "La"; artDetP2 = "la"; oaP2 = "a"; pronP2 = "ella"; detIndP2 = "una"; neutP2 = "la";
    }
    // Place
    let artDetLum, artDetLu, oaLu, detIndLu;
    if (place.sexGenre == "male") {
      artDetLum = "El"; artDetLu = "el"; oaLu = "o"; detIndLu = "un";
    } else {
      artDetLum = "La"; artDetLu = "la"; oaLu = "a"; detIndLu = "una";
    }
     // Object
     let artDetObm, artDetOb, oaOb, detIndOb
     if (object.sexGenre == "male") {
      artDetObm = "El"; artDetOb = "el"; oaOb = "o"; detIndOb = "un";
    } else {
      artDetObm = "La"; artDetOb = "la"; oaOb = "a"; detIndOb = "una";
    }
    var values = {
      nombP1i: character1.name,
      tipoP1i: character1.type,
      artDetP1m: artDetP1m,
      artDetP1: artDetP1,
      oaP1: oaP1,
      pronP1: pronP1,
      detIndP1: detIndP1,
      neutP1: neutP1,

      nombP2i: character2.name,
      tipoP2i:  character2.type,
      artDetP2m: artDetP2m,
      artDetP2: artDetP2,
      oaP2: oaP2,
      pronP2: pronP2,
      detIndP2: detIndP2,
      neutP2: neutP2,

      artDetLum: artDetLum,
      artDetLu: artDetLu,
      nomLui: place.name,
      oaLu: oaLu,
      detIndLu: detIndLu,

      artDetObm: artDetObm,
      artDetOb: artDetOb,
      oaOb: oaOb,
      detIndOb: detIndOb

  };

    console.log(values)

    /* 2. GET RANDOM STORY */
    let storySelected, i = null;

    while (!storySelected) {
      i = Math.floor(Math.random() * this.totalNumberOfStories);
      console.log(i,this.totalNumberOfStories)
      storySelected = this.unreadStories["st" + i]
    }
    /\{([^}]+)\}/g
    console.log("here it goes")
    console.log(storySelected.title)
    storySelected.title = storySelected.title.replace(/\{([^}]+)\}/g, function(i, match) {
        return values[match];
    });
    storySelected.story = storySelected.story.replace(/\{([^}]+)\}/g, function(i, match) {
      return values[match];
    });
    console.log(storySelected)

    this._refreshUnreadStories(i) //Fix this, it doesnt remove them

    return storySelected
  }

  _refreshUnreadStories(index: number): void
  {
    delete this.unreadStories["st" + index]
    if (!Object.keys(this.unreadStories).length) {
      this.resetReadStories()
    } else {
      this.readStoriesIDs.push("st" + index)
      this.storage.set('readStoriesIDs', this.readStoriesIDs);
    } 
   
  }

  resetReadStories(): void
  {
    this.readStoriesIDs = []
    this.unreadStories = {}
    
    this.storage.set('readStoriesIDs', this.readStoriesIDs);
    this.loadStoriesCollection()
  }

  filterByUnread(): void
  {
    this.storage.get('readStoriesIDs').then(
      (readStories) => {
        this.readStoriesIDs = readStories ? readStories : [];
        
        for (let i = 0; i < this.readStoriesIDs.length; i++) {
          delete this.unreadStories[this.readStoriesIDs[i]]
        }
      },
      e => {
        console.error("Error getting read stories", e)
      }
    );
  }
  loadStoriesCollection() 
  {
    //this.storage.set('config', config);

    this.http.get('assets/stories/info.json',).subscribe(
      info => {
        this.totalNumberOfStories = info['count'];
        for (let i = 1; i < info['count']+1; i++) {
          this.http.get('assets/stories/es/st' + i + '.json',).subscribe(
            d => {
              this.unreadStories['st' + i] = d
            },
            e => {
              console.error("Error getting stories", e)
            }
          );
        }
        this.filterByUnread()
        console.log(this.unreadStories)
      },
      e => {
        console.error("Error getting stories info", e)

      }
    );
    
  }

}
