import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http"
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '../providers/language-service/language-service';
import { ConfigService } from '../providers/config-service/config-service';
import { StoryService } from '../providers/story-service/story-service';
import { IonicStorageModule } from '@ionic/storage'
import { Globalization } from '@ionic-native/globalization';
import { NativeAudio } from '@ionic-native/native-audio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    SettingsPage
  ],
  providers: [
    LanguageService,
    ConfigService,
    StoryService,
    Globalization,
    NativeAudio,
    StatusBar,
    SplashScreen,
    {
    provide: ErrorHandler,
    useClass: IonicErrorHandler,
  }
  ]
})
export class AppModule {}

// Change path for localization folder
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
