import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver/gamesserver';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="newGame('No, Thanks!')">No, Thanks!</button>
      <button ion-item (click)="newGame('Perudo')">Perudo</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public gamesServer: GamesServerProvider,
  ) { }

  newGame(gameName) {
    this.gamesServer.newGame(gameName);
    this.viewCtrl.dismiss();
  }
}
