import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { NativeAudio } from '@ionic-native/native-audio';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language-service/language-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  public languageUser: string;
  public sound: boolean;
  public nightMode: boolean;
  public config;
  private initialConfig = {
    "language": null,
    "sound": true,
    "night-mode": false,
    "stories-read": {
      "db_count": "",
      "data": []
    }
  };

  constructor(
    protected storage: Storage,
    private translate: TranslateService,
    public language: LanguageService,
    public http: HttpClient,
    private nativeAudio: NativeAudio
  ) {
    // Initial userConfig

  }

  // It returns language stored on config
  getLanguageUser() {
    return this.config['language'];
  }

  // It returns language stored on config
  getSoundUser() {
    return this.config['sound'];
  }

  // It returns language stored on config
  getNightModeUser() {
    return this.config['night-mode'];
  }

  // It returns config Object
  getConfig() {
    return new Promise((resolve, reject) => {
      this.storage.get('config').then(
        (data) => {
          if (data) {
            this.config = data;
            resolve(data);
          } else if (this.setConfig(this.initialConfig)) {
            //Check if language is stored and set it
            if (!this.getLanguageUser()) {
              // Set the default language for translation strings, and the current language.
              this.language.selectBestLanguage().then(
                done => {
                  this.translate.use(this.language.langSelected);
                  this.setConfigAtt("language", this.language.langSelected);
                  resolve(this.config);
                },
                error => { }
              );
            }
          }
        },
        error => {
          reject(error);
        });
    });
  }

  // Save specific setting on config Object
  setConfigAtt(name, value) {
    switch (name) {
      case "language":
        this.config["language"] = value;
        break;
      case "sound":
        this.config["sound"] = value;
        if (value) {
          console.log('sound enabled')
          this.nativeAudio.play('main-ambient').then(function (msg) { console.info(msg) }, function (msg) { console.info(msg) });
        } else {
          console.log('sound disabled')
          this.nativeAudio.stop('main-ambient').then(function (msg) { console.info(msg) }, function (msg) { console.info(msg) });
        }
        break;
      case "night-mode":
        this.config["night-mode"] = value;
        break;
    }
    this.setConfig(this.config);
  }

  // Save config object
  setConfig(config) {
    this.config = config;
    return this.storage.set('config', config);
  }
  updateCollection() {
    this.http.get("http://storian.esy.es/api/get-stories-length", {}).subscribe(
      data => {
        //this.config['stories-read']['db_count'] = data.json();
      },
      error => {
        console.log('error getting length-collection',error)
      });
  }

}
