import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { GamesServerProvider } from '../../providers/gamesserver/gamesserver';


@Component({
  selector: 'page-game-detail',
  templateUrl: 'game-detail.html'
})
export class GameDetailPage {
  gameNumber: any;
  game: any;
  currentUsername: string;
  status: string;
  ready: string;
  allGamesInfoSubscription: any;
  currentUsernameSubscription: any;

  SERVER_URL = window["process_env"].serverURL;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public gamesServer: GamesServerProvider,
  ) {
    this.gameNumber = this.navParams.data.gameNumber;

    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      this.currentUsername = currentUsername;
      if (!this.game) return;
      this.updateReady();
    });

    this.allGamesInfoSubscription = gamesServer.getAllGamesInfo().subscribe((allGamesInfo) => {
      this.game = allGamesInfo[this.gameNumber];
      console.log('game-detail.ts', this.game);
      if (!this.game) return;
      this.status = this.game.gameInfo.started ? (this.game.gameInfo.finished ? 'finished' : 'started') : 'not started';
      this.updateReady();
    });
  }

  ngOnDestroy() {
    this.allGamesInfoSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }

  updateReady() {
    for (let i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].username === this.currentUsername) {
        this.ready = this.game.players[i].ready ? 'Ready' : 'Not Ready';
      }
    }
  }

  leaveButtonClick() {
    this.gamesServer.leaveGame();
    this.navCtrl.push('GamesPage');
  }

  readyButtonClick() {
    this.gamesServer.readyToGame();
  }

  startButtonClick() {
    console.log(2);
  }
}
