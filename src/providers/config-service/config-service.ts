import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigService {
  public languageUser: string;
  public sound: boolean;
  public nightMode: boolean;
  public config;

  constructor(
    private storage: Storage
  ) { }

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
          this.config = data;
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  // Save specific setting on config Object
  setConfigAtt(name, value) {
    return new Promise((resolve, reject) => {
      this.getConfig().then(

        (data) => {
          console.log(data);

          switch (name) {
            case "language":
              data["language"] = value;
              break;
            case "sound":
              data["sound"] = value;
              break;
            case "night-mode":
              data["night-mode"] = value;
              break;
          }
          this.setConfig(data);
          resolve();
          console.log('config att', this.config)
        }

      );
    });
  }

  // Save config object
  setConfig(config) {
    this.config = config;
    return this.storage.set('config', config);
  }

}
