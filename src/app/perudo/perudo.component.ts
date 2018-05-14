import { Component, OnInit, OnDestroy } from '@angular/core';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-perudo',
  templateUrl: './perudo.component.html',
  styleUrls: ['./perudo.component.css']
})
export class PerudoComponent implements OnInit, OnDestroy {
  gameSubscription: any;
  game: any = { gameInfo: {} };
  currentUsernameSubscription: any;
  currentUsername: any;
  diceNumber: number;
  diceFigure: number;

  currentBet: String;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.diceNumber = 1;
    this.diceFigure = 1;

    this.gameSubscription = gamesServer.getGame().subscribe((openGame) => {
      if (openGame) {
        this.game = openGame;
        this.updateCurrentBet();
        this.updateNewBet();
      }
    });
    this.currentUsernameSubscription = gamesServer.getCurrentUsername().subscribe((currentUsername) => {
      console.log('app-perudo: currentUsername', currentUsername);
      this.currentUsername = currentUsername;
    });
  }

  updateCurrentBet() {
    this.currentBet = '';
    for (let i = 0; i < this.game.gameInfo.currentDiceNumber; i++) {
      this.currentBet += this.game.gameInfo.currentDiceFigure + ' ';
    }
  }

  updateNewBet() {
    if (this.game.nextPlayersNames && this.game.nextPlayersNames.indexOf(this.currentUsername) >= 0) {
      if (this.game.gameInfo.currentDiceFigure >= 6) {
        this.diceNumber = this.game.gameInfo.currentDiceNumber + 1;
        this.diceFigure = 1;
      } else {
        this.diceNumber = this.game.gameInfo.currentDiceNumber;
        this.diceFigure = this.game.gameInfo.currentDiceFigure + 1;
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }

  diceNumberInc() {
    // let allDicesNumber = 0;
    // for (let i = 0; i < this.game.players.length; i++) {
    //   allDicesNumber += this.game.players[i].dicesCount;
    // }
    // if (this.diceNumber < allDicesNumber) {
    this.diceNumber++;
    // }
  }

  diceNumberDec() {
    if (this.diceNumber > this.game.gameInfo.currentDiceNumber && this.diceNumber > 1) {
      this.diceNumber--;
      if (this.diceNumber <= this.game.gameInfo.currentDiceNumber && this.diceFigure <= this.game.gameInfo.currentDiceFigure) {
        this.diceFigure = this.game.gameInfo.currentDiceFigure + 1;
      }
    }
  }

  diceFigureInc() {
    if (this.diceFigure < 6) {
      this.diceFigure++;
    }
  }

  diceFigureDec() {
    if ((this.diceFigure === this.game.gameInfo.currentDiceNumber &&
      this.diceFigure > this.game.gameInfo.currentDiceFigure + 1) ||
      this.diceFigure > 1) {
      this.diceFigure--;
    }
  }

  moveBet() {
    this.gamesServer.move({ number: this.diceNumber, figure: this.diceFigure });
  }

  moveNotBelieve() {
    this.gamesServer.move({ notBelieve: true });
  }
}
