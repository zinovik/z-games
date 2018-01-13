import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { GamesPage } from '../pages/games/games';
import { GamesFilterPage } from '../pages/games-filter/games-filter';
import { GameDetailPage } from '../pages/game-detail/game-detail';
import { SignupPage } from '../pages/signup/signup';
import { SupportPage } from '../pages/support/support';

import { GamesServerProvider } from '../providers/gamesserver/gamesserver';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    GamesPage,
    GamesFilterPage,
    GameDetailPage,
    SignupPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {
      locationStrategy: 'path',
    }, {
      links: [
        { component: GamesPage, name: 'GamesPage', segment: 'games' },
        { component: GameDetailPage, name: 'GameDetailPage', segment: 'game/:gameNumber' },
        { component: GamesFilterPage, name: 'GamesFilterPage', segment: 'games-filter' },
        { component: AboutPage, name: 'AboutPage', segment: 'about' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    GamesPage,
    GamesFilterPage,
    GameDetailPage,
    SignupPage,
    SupportPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GamesServerProvider,
    InAppBrowser,
  ]
})
export class AppModule { }
