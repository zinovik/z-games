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
  allDicesCount: number;

  currentBet: String = '';
  myBet: String = '';

  myBetNumberIncDisable: Boolean;
  myBetNumberDecDisable: Boolean;
  myBetFigureIncDisable: Boolean;
  myBetFigureDecDisable: Boolean;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.gameSubscription = gamesServer.getGame()
      .subscribe((openGame) => {
        if (openGame) {
          this.game = openGame;
          this.updateAllDicesCount();
          this.updateCurrentBet();
          this.updateMyBet();
        }
      });

    this.currentUsernameSubscription = gamesServer.getCurrentUsername()
      .subscribe((currentUsername) => {
        console.log('app-perudo: currentUsername', currentUsername);
        this.currentUsername = currentUsername;
        this.updateMyBet();
      });
  }

  updateAllDicesCount() {
    if (this.game.gameInfo.players) {
      this.allDicesCount = 0;
      for (let i = 0; i < this.game.gameInfo.players.length; i++) {
        this.allDicesCount += this.game.gameInfo.players[i].dicesCount;
      }
    }
  }

  updateCurrentBet() {
    this.currentBet = '';
    for (let i = 0; i < this.game.gameInfo.currentDiceNumber; i++) {
      this.currentBet += this.game.gameInfo.currentDiceFigure + ' ';
    }
  }

  updateMyBet() {
    if (this.game.nextPlayersNames
      && this.game.nextPlayersNames.indexOf(this.currentUsername) >= 0) {
      if (!this.diceNumber || !this.diceFigure) {
        this.diceNumber = 1;
        this.diceFigure = 2;
        if (this.game.gameInfo.currentDiceNumber && this.game.gameInfo.currentDiceFigure) {
          this.diceNumber = this.game.gameInfo.currentDiceNumber + 1;
          this.diceFigure = this.game.gameInfo.currentDiceFigure;
        }
      }
    }

    this.myBet = '';
    for (let i = 0; i < this.diceNumber; i++) {
      this.myBet += this.diceFigure + ' ';
    }

    this.myBetNumberIncDisable = this.diceNumber >= this.allDicesCount;
    this.myBetNumberDecDisable = this.diceNumber <= 1
      || this.diceNumber <= this.game.gameInfo.currentDiceNumber
      || (this.diceNumber <= this.game.gameInfo.currentDiceNumber + 1 && this.diceFigure <= this.game.gameInfo.currentDiceFigure);

    this.myBetFigureIncDisable = this.diceFigure >= 6;
    this.myBetFigureDecDisable = this.diceFigure <= 2
      || (this.diceNumber === this.game.gameInfo.currentDiceNumber && this.diceFigure <= this.game.gameInfo.currentDiceFigure + 1);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }

  diceNumberInc() {
    if (!this.myBetNumberIncDisable) {
      this.diceNumber++;
      this.updateMyBet();
    }
  }

  diceNumberDec() {
    if (!this.myBetNumberDecDisable) {
      this.diceNumber--;
      this.updateMyBet();
    }
  }

  diceFigureInc() {
    if (!this.myBetFigureIncDisable) {
      this.diceFigure++;
      this.updateMyBet();
    }
  }

  diceFigureDec() {
    if (!this.myBetFigureDecDisable) {
      this.diceFigure--;
      this.updateMyBet();
    }
  }

  moveBet() {
    this.gamesServer.move({ number: this.diceNumber, figure: this.diceFigure });
    this.diceNumber = 0;
    this.diceFigure = 0;
  }

  moveNotBelieve() {
    this.gamesServer.move({ notBelieve: true });
  }
}
