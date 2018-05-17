import { Component, OnInit, OnDestroy } from '@angular/core';

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
  SERVER_URL: String;
  showRules: Boolean = false;
  ready: Boolean;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.SERVER_URL = window['configVars'].serverURL;
    this.gameSubscription = gamesServer.getGame()
      .subscribe((openGame) => {
        if (openGame) {
          this.game = openGame;
        }
      });

    this.currentUsernameSubscription = gamesServer.getCurrentUsername()
      .subscribe((currentUsername) => {
        this.currentUsername = currentUsername;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
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
  }
}
