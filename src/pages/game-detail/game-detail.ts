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
  readyButtonLabel: string;
  allGamesInfoSubscription: any;
  currentUsernameSubscription: any;
  perudoDiceNumber: number = 1;
  perudoDiceFigure: number = 1;
  showRules: boolean = false;
  messageInput: string;

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
      if (!this.game) return;
      if (this.game.nextPlayersNames && this.game.nextPlayersNames.indexOf(this.currentUsername) >= 0) {
        if (this.game.gameInfo.currentDiceFigure >= 6) {
          this.perudoDiceNumber = this.game.gameInfo.currentDiceNumber + 1;
          this.perudoDiceFigure = 1;
        } else {
          this.perudoDiceNumber = this.game.gameInfo.currentDiceNumber;
          this.perudoDiceFigure = this.game.gameInfo.currentDiceFigure + 1;
        }
      }

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
        this.readyButtonLabel = this.game.players[i].ready ? 'Not ready' : 'Ready';
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
    this.gamesServer.startGame();
  }

  noThanksPayButtonClick() {
    this.gamesServer.move({ takeCard: false });
  }

  noThanksTakeButtonClick() {
    this.gamesServer.move({ takeCard: true });
  }

  perudoDiceNumberInc() {
    // < all dices number?
    this.perudoDiceNumber++;
  }

  perudoDiceNumberDec() {
    if (this.perudoDiceNumber > this.game.gameInfo.currentDiceNumber) {
      this.perudoDiceNumber--;
      if (this.perudoDiceNumber <= this.game.gameInfo.currentDiceNumber && this.perudoDiceFigure <= this.game.gameInfo.currentDiceFigure) {
        this.perudoDiceFigure = this.game.gameInfo.currentDiceFigure + 1;
      }
    }
  }

  perudoDiceFigureInc() {
    if (this.perudoDiceFigure < 6) {
      this.perudoDiceFigure++;
    }
  }

  perudoDiceFigureDec() {
    if ((this.perudoDiceNumber === this.game.gameInfo.currentDiceNumber &&
        this.perudoDiceFigure > this.game.gameInfo.currentDiceFigure + 1) ||
        this.perudoDiceFigure > 1) {
      this.perudoDiceFigure--;
    }
  }

  perudoBetButtonClick() {
    this.gamesServer.move({ number: this.perudoDiceNumber, figure: this.perudoDiceFigure });
  }

  perudoNotBelieveButtonClick() {
    this.gamesServer.move({ notBelieve: true });
  }

  rulesButtonClick() {
    this.showRules = !this.showRules;
  }

  messageInputKeyUp(key) {
    console.log(key);
  }

  sendButtonClick() {
    this.gamesServer.message(this.messageInput);
    this.messageInput = '';
  }
}
