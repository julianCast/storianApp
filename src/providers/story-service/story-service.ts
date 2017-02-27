import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import { ConfigService } from '../config-service/config-service';

@Injectable()
export class StoryService {
  public langSelected: string;
  public langConfig: any;

  constructor(
    private http: Http,
    private platform: Platform,
    private config: ConfigService
  ) { }

  getStory(character1, character2, place) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let lang = this.config.getLanguageUser();
      let data = "nameP1="+character1.name+"&typeP1="+character1.type+"&nameP2="+character2.name+"&typeP2="+character2.type+"&place="+place+"&lang=es"
      this.http.post("http://storian.esy.es/api/get-story", data, { headers: headers }).subscribe(
        data => {
          resolve(data.json());
        },
        error => {
          console.log('error getting length-collection', error)
          reject(error);
        });
    });
  }
}
