import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http } from '@angular/http';
import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { MainPage } from '../pages/main/main';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../providers/language-service/language-service';
import { ConfigService } from '../providers/config-service/config-service';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    MainPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    MainPage
  ],
  providers: [
    LanguageService,
    ConfigService,
    Storage,
    {
    provide: ErrorHandler,
    useClass: IonicErrorHandler,
  }
  ]
})
export class AppModule {}

// Change path for localization folder
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
