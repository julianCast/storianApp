import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import { ConfigService } from '../config-service/config-service';

@Injectable()
export class StoryService {
  public langSelected: string;
  public langConfig: any;

  constructor(
    private http: HttpClient
  ) { }

  getStory(character1, character2, place, object) {
    return new Promise((resolve, reject) => {
      let headers = {'Content-Type':'application/x-www-form-urlencoded'}


      // Uncomment whenever we use languages let lang = this.config.getLanguageUser();
      let data = "nameP1="+character1.name+"&typeP1="+character1.type+"&nameP2="+character2.name+"&typeP2="+character2.type+"&place="+place+"&object="+object+"&lang=es"
      this.http.post("http://storian.esy.es/api/get-story", data, { headers: new HttpHeaders(headers) }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          console.log('error getting length-collection', error)
          reject(error);
        });
    });
  }
}
