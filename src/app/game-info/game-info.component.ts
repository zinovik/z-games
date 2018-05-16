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
  SERVER_URL: String;
  showRules: Boolean = false;

  constructor(
    public gamesServer: GamesserverService,
  ) {
    this.SERVER_URL = window['configVars'].serverURL;
    this.gameSubscription = gamesServer.getGame().subscribe((openGame) => {
      if (openGame) {
        this.game = openGame;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

  leaveGame() {
    this.gamesServer.leaveGame();
  }

  redyToGame() {
    this.gamesServer.readyToGame();
  }

  startGame() {
    this.gamesServer.startGame();
  }
}
