import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { GamesserverService } from './../gamesserver.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit, OnDestroy {
  gameSubscription: any;
  game: any = { gameInfo: {} };
  currentUsernameSubscription: any;
  currentUsername: any;
  GAMES_IMAGES: String;
  showRules: Boolean = false;
  ready: Boolean;
  yourMove: Boolean;
  startTry: Boolean;
  watcher: Boolean;

  constructor(
    public snackBar: MatSnackBar,
    public gamesServer: GamesserverService,
  ) {
    this.GAMES_IMAGES = gamesServer.GAMES_IMAGES;

    this.gameSubscription = gamesServer.getGame()
      .subscribe((openGame) => {
        if (openGame) {
          this.game = openGame;
          if (this.startTry && !this.game.gameInfo.started) {
            this.snackBar.open(`You can't start this game. Check if there are minimum ready players`, 'Close', {
              duration: 3000
            });
            this.startTry = false;
          }
          this.updateYourMove();
          this.updateWatcher();
        }
      });

    this.currentUsernameSubscription = gamesServer.getCurrentUsername()
      .subscribe((currentUsername) => {
        this.currentUsername = currentUsername;
        this.updateYourMove();
        this.updateWatcher();
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }

  updateYourMove() {
    if (this.game
      && this.game.gameInfo
      && !this.game.gameInfo.finished
      && this.game.nextPlayersNames
      && this.game.nextPlayersNames.indexOf(this.currentUsername) >= 0) {
      if (!this.yourMove) {
        this.snackBar.open(`Your move!`, 'Close', {
          duration: 3000
        });
      }
      this.yourMove = true;
      return;
    }
    this.yourMove = false;
  }

  updateWatcher() {
    if (!this.game.watchers) {
      return;
    }

    for (let i = 0; i < this.game.watchers.length; i++) {
      if (this.game.watchers[i].username === this.currentUsername) {
        this.watcher = true;
      }
    }
  }

  leaveGame() {
    this.gamesServer.leaveGame();
  }

  readyToGame() {
    this.gamesServer.readyToGame();

    for (let i = 0; i < this.game.players.length; i++) {
      if (this.game.players[i].username === this.currentUsername) {
        this.ready = !this.game.players[i].ready;
      }
    }
  }

  startGame() {
    this.gamesServer.startGame();
    this.startTry = true;
  }
}
